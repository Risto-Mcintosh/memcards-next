import * as React from 'react';
import { useRouter } from 'next/router';
import { Flashcard } from '@components/Flashcard';
import { FlashcardProvider } from '@context/flashcard';
import { useFlashcards } from '@utils/useFlashcards';
import { DeckCompleted } from '@components/DeckCompleted';
import { EditFlashcard } from '@components/EditFlashcard';
import { useDeck } from '@utils/client';

export default function FlashcardPage() {
  const router = useRouter();

  const { data, isFetchedAfterMount, isSuccess, remove: clearCache } = useDeck(
    router.query.deckId
  );

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

    if (isDeckEmpty && isFetchedAfterMount) {
      router.push('/decks');

      return () => clearCache();
    }
  }, [isFetchedAfterMount, isDeckEmpty]);

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
