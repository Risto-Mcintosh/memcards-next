import * as React from 'react';
import { useFlashcardContext } from '@context/flashcard';
import { useFlashcardUpdate } from '@utils/client';
import Layout from '@components/Layout';
import TextInput from '@ui/TextInput';
import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FlashcardFormInputs, FlashcardImage } from 'types';
import { ImageField } from './ImageField';
import { Button } from '@ui/Buttons';

export function EditFlashcard() {
  const { flashcard, deck, editFlashcard } = useFlashcardContext();
  const { mutate } = useFlashcardUpdate();
  const [image, setImage] = React.useState<FlashcardImage | null>(
    flashcard.image
  );
  const { register, handleSubmit } = useForm<FlashcardFormInputs>({
    defaultValues: {
      deckName: deck.name,
      front: flashcard.front,
      back: flashcard.back
    }
  });

  const onSubmit: SubmitHandler<FlashcardFormInputs> = (data, event) => {
    if (event.isPropagationStopped()) return;

    mutate(
      {
        deckId: deck.id,
        flashcard: { id: flashcard.id, ...data, image }
      },
      {
        onSuccess: (newFlashcard) => editFlashcard(newFlashcard)
      }
    );
  };

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center py-4">
        <h1 className="mb-6 text-3xl">Edit Flashcard</h1>
        <div className="w-full max-w-xs">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block mb-2" htmlFor="deck-name">
              Deck Name:
            </label>
            <input
              className="w-full px-0 mb-6 border-0 border-b"
              type="text"
              name="deckName"
              id="deck-name"
              value={deck.name}
              readOnly
            />
            <TextInput
              ref={register}
              labelId="card-front"
              name="front"
              label="Front:"
            />

            <ImageField image={image} setImage={setImage} />

            <TextInput
              ref={register}
              labelId="card-back"
              name="back"
              label="Back:"
            />
            <div className="flex justify-around">
              <Button size="lg" className="block w-1/3 mx-auto" type="submit">
                Edit
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="block w-1/3 mx-auto"
                onClick={() => editFlashcard(flashcard)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
