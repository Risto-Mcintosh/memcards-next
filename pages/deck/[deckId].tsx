import * as React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Flashcard } from '@components/Flashcard';
import { FlashcardProvider } from '@context/flashcard';
import { client } from '@utils/client';
import { useFlashcards } from '@utils/useFlashcards';

export default function FlashcardPage() {
  const { query, push } = useRouter();

  const { data, isFetchedAfterMount } = useQuery(`deck ${query.deckId}`, () =>
    client(`/deck/${query.deckId}`)
  );

  const { isDeckEmpty, hasCardsLeftToStudy, ...rest } = useFlashcards(
    data?.cards
  );

  if (isDeckEmpty && isFetchedAfterMount) {
    return push('/decks');
  }

  return (
    <FlashcardProvider state={{ deckName: data.deckName, ...rest }}>
      {!hasCardsLeftToStudy ? <p>No Cards left</p> : <Flashcard />}
    </FlashcardProvider>
  );
}
