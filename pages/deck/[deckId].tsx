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
  const flashcards = data?.flashcards;
  const { isDeckEmpty, noCardsLeftToStudy, isEditing, ...rest } = useFlashcards(
    flashcards
  );

  React.useEffect(() => {
    if (isSuccess) {
      console.count('initialize');
      rest.initialize(flashcards);
    }
  }, [isSuccess, rest.initialize]);

  React.useEffect(() => {
    if (isDeckEmpty && isFetchedAfterMount) {
      clearCache();
      router.push('/decks');
    }
  }, [isFetchedAfterMount, isDeckEmpty]);

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
