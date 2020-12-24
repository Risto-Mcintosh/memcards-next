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
      console.log({ newThing: newDeck });
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

export { useDeckList, useDeckDelete, useDeckCreate };
