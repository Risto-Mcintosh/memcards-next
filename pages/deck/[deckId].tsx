import * as React from 'react';
import { useRouter } from 'next/router';
import { Flashcard } from '@components/Flashcard';
import { FlashcardProvider } from '@context/flashcard';
import { useFlashcards } from '@utils/useFlashcards';
import { DeckCompleted } from '@components/DeckCompleted';
import { EditFlashcard } from '@components/EditFlashcard';
import { useDeck } from '@utils/client';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

type props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function FlashcardPage({ params }: props) {
  const router = useRouter();
  const {
    data,
    isFetchedAfterMount,
    isSuccess,
    isError,
    remove: clearCache
  } = useDeck(params.deckId);

  const {
    isDeckEmpty,
    noCardsLeftToStudy,
    isEditing,
    initialize,
    ...rest
  } = useFlashcards(data?.flashcards);

  React.useEffect(() => {
    // console.count('effect1');
    if (isSuccess) {
      initialize();
    }
  }, [isSuccess, initialize]);

  React.useEffect(() => {
    // console.count('effect2');

    if ((isDeckEmpty && isFetchedAfterMount) || isError) {
      router.push('/decks');

      return () => clearCache();
    }
  }, [isFetchedAfterMount, isDeckEmpty, isError]);

  return (
    <FlashcardProvider state={{ deck: data?.deck, initialize, ...rest }}>
      {noCardsLeftToStudy ? (
        <DeckCompleted />
      ) : isEditing ? (
        <EditFlashcard />
      ) : (
        <Flashcard />
      )}
    </FlashcardProvider>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  return {
    props: { params }
  };
}
