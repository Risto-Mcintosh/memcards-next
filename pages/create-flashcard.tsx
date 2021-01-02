import { useDeckList } from '@utils/client';
import ImageSearch from 'components/ImageSearch';
import Layout from 'components/Layout';
import TextInput from 'components/TextInput';
import Head from 'next/head';
import React from 'react';
import { FlashcardImage } from 'types';

export default function CreateFlashcard() {
  const { data, isLoading } = useDeckList();
  const [isImageSearchOpen, setOpen] = React.useState(false);
  const [image, setImage] = React.useState<FlashcardImage | null>();
  const buttonRef = React.useRef(null);

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
            <form>
              <select className="w-full mb-6 text-xl rounded" name="deck-name">
                {data.map((deck) => (
                  <option value={deck.name} key={deck.id}>
                    {deck.name}
                  </option>
                ))}
              </select>

              <TextInput name="front" labelId="card-front" label="Front:" />

              <div className="flex mb-6">
                <p className="">Image (optional):</p>
                <button
                  ref={buttonRef}
                  onClick={() => setOpen(true)}
                  type="button"
                  className="px-3 py-2 ml-4 bg-gray-300 rounded"
                >
                  Search
                </button>
                {image && (
                  <div>
                    <img src={image.thumb} alt={image.alt} />
                  </div>
                )}
              </div>

              <TextInput name="back" labelId="card-back" label="Back:" />

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
