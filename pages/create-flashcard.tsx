import { useDeckList, useFlashcardCreate } from '@utils/client';
import ImageSearch from 'components/ImageSearch';
import Layout from 'components/Layout';
import TextInput from 'components/TextInput';
import Head from 'next/head';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FlashcardFormInputs, FlashcardImage } from 'types';

export default function CreateFlashcard() {
  const { data, isLoading } = useDeckList();
  const { register, handleSubmit } = useForm<FlashcardFormInputs>();
  const { mutate } = useFlashcardCreate();
  const [isImageSearchOpen, setOpen] = React.useState(false);
  const [image, setImage] = React.useState<FlashcardImage | null>();
  const buttonRef = React.useRef(null);

  const onSubmit: SubmitHandler<FlashcardFormInputs> = (
    { deckName, ...card },
    e
  ) => {
    const selectEl = e.target.elements['deckName'];
    const selectedIndex = selectEl.options?.selectedIndex;
    const deckId = selectEl[selectedIndex].dataset.deckid;
    mutate(
      { deckId, flashcard: { ...image, ...card } },
      {
        onSuccess: () => {
          e.target.reset();
          setImage(null);
        }
      }
    );
  };

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <article className="flex flex-col items-center">
          <h1 className="mb-6 text-3xl">Create A New Flashcard</h1>
          <div className="w-full max-w-xs">
            <form onSubmit={handleSubmit(onSubmit)}>
              <select
                className="w-full mb-6 text-xl rounded"
                name="deckName"
                ref={register}
              >
                {data.map((deck) => (
                  <option value={deck.name} key={deck.id} data-deckid={deck.id}>
                    {deck.name}
                  </option>
                ))}
              </select>

              <TextInput
                name="front"
                labelId="card-front"
                label="Front:"
                ref={register}
              />

              <div className="flex items-start mb-6">
                <p className="">Image (optional):</p>
                {image && (
                  <div className="flex-1 ml-2">
                    <img src={image.thumb} alt={image.alt} />
                  </div>
                )}
                <div className="flex flex-col ml-2">
                  <button
                    ref={buttonRef}
                    onClick={() => setOpen(true)}
                    type="button"
                    className="px-3 py-2 bg-gray-300 rounded"
                  >
                    Search
                  </button>
                  {image && (
                    <button
                      onClick={() => setImage(null)}
                      type="button"
                      className="px-3 py-2 mt-3 bg-gray-300 rounded"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <TextInput
                name="back"
                labelId="card-back"
                label="Back:"
                ref={register}
              />

              <button
                className="block px-16 py-3 mx-auto text-2xl text-white bg-gray-600 rounded-xl"
                type="submit"
              >
                Create
              </button>
            </form>
          </div>
        </article>
      )}
      {isImageSearchOpen && (
        <ImageSearch
          closeSearch={() => setOpen(false)}
          anchorEl={buttonRef}
          setImage={setImage}
        />
      )}
    </Layout>
  );
}
