import { useMutation, useQuery, useQueryClient } from 'react-query';
import { client } from './fetch-wrapper';

function useDeckList() {
  return useQuery('deckList', () => client('/decks'), {
    staleTime: Infinity
  });
}

function useDeckDelete() {
  const queryClient = useQueryClient();
  return useMutation(
    (deckId: string) =>
      client(`/deck/${deckId}`, {
        method: 'Delete'
      }),
    {
      onSuccess(data, deckId) {
        queryClient.setQueryData('deckList', (oldData: any[]) => {
          if (!oldData) return;
          return oldData?.filter((deck) => deck.id !== deckId);
        });
      }
    }
  );
}

function useDeckCreate() {
  const queryClient = useQueryClient();
  return useMutation(
    (newDeck: any) => {
      return client('/deck', { body: newDeck });
    },
    {
      onSuccess(data) {
        queryClient.setQueryData('deckList', (oldData: any[]) => {
          if (!oldData) return;
          return [...oldData, data];
        });
      }
    }
  );
}

interface UpdateDeckMutation {
  deckId: string;
  newDeck: any;
}

function useDeckUpdate() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ deckId, newDeck }: UpdateDeckMutation) =>
      client(`/deck/${deckId}`, {
        body: newDeck,
        method: 'Put'
      }),
    {
      onSuccess(data, { deckId }) {
        queryClient.setQueryData('deckList', (oldData: any[]) => {
          if (!oldData) return;
          return oldData?.map((deck) => (deck.id === deckId ? data : deck));
        });
      }
    }
  );
}

function useFlashcardEdit() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ deckId, flashcard }: any) =>
      client(`/deck/${deckId}/card/${flashcard.id}`, {
        method: 'put',
        body: flashcard
      }),
    {
      onSuccess(flashcard, { deckId }) {
        queryClient.setQueryData(`deck ${deckId}`, (oldData: any) => {
          if (!oldData) return;
          let result = oldData;
          const cardToEditIdx = oldData.cards.findIndex(
            (card) => card.id === flashcard.id
          );
          result.cards[cardToEditIdx] = flashcard;
          return result;
        });
      }
    }
  );
}

function useFlashcardCreate() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ deckId, flashcard }: any) =>
      client(`/deck/${deckId}/card`, {
        body: flashcard
      }),
    {
      onSuccess: (flashcard, { deckId }) => {
        queryClient.setQueryData('deckList', (oldData: any[]) => {
          console.log({ oldData });
          if (!oldData) return [];
          let result = oldData;
          const deckToEditIdx = oldData.findIndex((deck) => deck.id === deckId);
          result[deckToEditIdx].cardCount++;
          return result;
        });
      }
    }
  );
}

export {
  useDeckList,
  useDeckDelete,
  useDeckCreate,
  useDeckUpdate,
  useFlashcardEdit,
  useFlashcardCreate
};
