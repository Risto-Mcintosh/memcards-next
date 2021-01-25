import { ImageField } from '@components/ImageField';
import { useDeckList, useFlashcardCreate } from '@utils/client';
import Layout from 'components/Layout';
import TextInput from '@ui/TextInput';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FlashcardFormInputs, FlashcardImage } from 'types';
import { Button } from '@components/ui-elements/Buttons';

export default function CreateFlashcard() {
  const { data, isLoading } = useDeckList();
  const { register, handleSubmit, reset } = useForm<FlashcardFormInputs>();
  const [image, setImage] = React.useState<FlashcardImage | null>();
  const { mutate } = useFlashcardCreate();
  const onSubmit: SubmitHandler<FlashcardFormInputs> = (
    { deckName, ...card },
    e
  ) => {
    if (e.isPropagationStopped()) return;

    /* Getting the 'deckId' data attribute 
    from the selected option in the 'deckName' select field */
    const selectEl = e.target.elements['deckName'];
    const selectedIndex = selectEl.options?.selectedIndex;
    const deckId = selectEl[selectedIndex].dataset.deckid;
    mutate(
      { deckId, flashcard: { ...card, image } },
      {
        onSuccess: () => {
          reset({ deckName });
          setImage(null);
        }
      }
    );
  };

  return (
    <Layout>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-center py-4">
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

              <ImageField image={image} setImage={setImage} />

              <TextInput
                name="back"
                labelId="card-back"
                label="Back:"
                ref={register}
              />

              <Button size="lg" className="block mx-auto" type="submit">
                Create
              </Button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
