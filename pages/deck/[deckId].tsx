import * as React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Flashcard } from '@components/Flashcard';
import { FlashcardProvider } from '@context/flashcard';
import { client } from '@utils/fetch-wrapper';
import { useFlashcards } from '@utils/useFlashcards';
import { DeckCompleted } from '@components/DeckCompleted';
import { EditFlashcard } from '@components/EditFlashcard';

function useDeck(deckId: string | string[]) {
  return useQuery(`deck ${deckId}`, () => {
    if (!deckId) return Promise.reject('no endpoint');

    return client(`/deck/${deckId}`);
  });
}

export default function FlashcardPage() {
  const router = useRouter();

  const { data, isFetchedAfterMount } = useDeck(router.query.deckId);
  const { isDeckEmpty, noCardsLeftToStudy, isEditing, ...rest } = useFlashcards(
    data?.cards
  );
  console.log({ cards: data?.cards });
  React.useEffect(() => {
    if (isDeckEmpty && isFetchedAfterMount && router.query.deckId) {
      router.push('/decks');
    }
  }, [isDeckEmpty, isFetchedAfterMount, router]);

  return (
    <FlashcardProvider state={{ deck: data?.deck, ...rest }}>
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
