import * as React from "react";
import { useFlashcardContext } from "@context/flashcard";
import { useFlashcardUpdate } from "@utils/client";
import Layout from "@components/Layout";
import TextInput from "@ui/TextInput";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { FlashcardFormInputs, FlashcardImage } from "types";
import { ImageField } from "./ImageField";
import { Button } from "@ui/Buttons";
import { Spacer } from "@ui/Spacer";

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
      back: flashcard.back,
    },
  });

  const onSubmit: SubmitHandler<FlashcardFormInputs> = (data, event) => {
    if (event.isPropagationStopped()) return;

    mutate(
      {
        deckId: deck.id,
        flashcard: { id: flashcard.id, ...data, image },
      },
      {
        onSuccess: (newFlashcard) => editFlashcard(newFlashcard),
      }
    );
  };

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className="flex flex-col items-center py-4">
        <h1 className="mb-6 text-3xl">Edit Flashcard</h1>
        <div className="w-full max-w-xs">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              labelId="deck-name"
              name="deckName"
              label="Deck Name:"
              value={deck.name}
              readOnly
              disabled
              className="bg-transparent border-0 border-b"
              style={{
                borderRadius: 0,
              }}
              {...register("deckName")}
            />

            <TextInput
              labelId="card-front"
              name="front"
              label="Front:"
              {...register("front")}
            />

            <ImageField image={image} setImage={setImage} />

            <TextInput
              ref={register}
              labelId="card-back"
              name="back"
              label="Back:"
              {...register("back")}
            />
            <div className="flex flex-col justify-around">
              <Button type="submit">Edit</Button>
              <Spacer size={10} />
              <Button
                variant="outline"
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
