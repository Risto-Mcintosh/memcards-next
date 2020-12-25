import { useMutation, useQuery, useQueryClient } from 'react-query';
import { client } from './fetch-wrapper';

function useDeckList() {
  return useQuery('decks', () => client('/decks'));
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
        queryClient.setQueryData('decks', (oldData: any[]) => {
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
        queryClient.setQueryData('decks', (oldData: any[]) => {
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
        queryClient.setQueryData('decks', (oldData: any[]) => {
          console.log({ data, oldData, deckId });
          if (!oldData) return;
          return oldData?.map((deck) => (deck.id === deckId ? data : deck));
        });
      }
    }
  );
}

export { useDeckList, useDeckDelete, useDeckCreate, useDeckUpdate };
