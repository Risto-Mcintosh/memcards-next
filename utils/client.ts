import {
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient
} from 'react-query';
import { Deck, Flashcard } from 'types';
import { client } from './fetch-wrapper';

interface ClientTypes {
  deckId: string;
  cardId: string;
  flashcard: Flashcard;
  deckName: string;
}

export type DeckQuery = Partial<Deck> & { flashcards: Flashcard[] };

function useDeck(deckId: string | string[]) {
  return useQuery(`deck ${deckId}`, () => client(`/deck/${deckId}`));
}

function useDeckList() {
  return useQuery('deckList', () => client('/decks'), {
    staleTime: 1000 * 60 * 60 * 2
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
    (newDeck: Pick<ClientTypes, 'deckName'>) => {
      return client('/deck', { data: newDeck });
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

function useDeckUpdate() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ deckId, deckName }: Pick<ClientTypes, 'deckId' | 'deckName'>) =>
      client(`/deck/${deckId}`, {
        data: { deckName },
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

function useFlashcardUpdate() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ deckId, flashcard }: Pick<ClientTypes, 'deckId' | 'flashcard'>) =>
      client(`/deck/${deckId}/card/${flashcard.id}`, {
        method: 'put',
        data: flashcard
      }),
    {
      onSuccess(flashcard, { deckId }) {
        queryClient.setQueryData(`deck ${deckId}`, (oldData: any) => {
          if (!oldData) return;
          let result = { ...oldData };
          const cardToEditIdx = oldData.flashcards.findIndex(
            (card) => card.id === flashcard.id
          );
          result.flashcards[cardToEditIdx] = flashcard;
          return result;
        });
      }
    }
  );
}

function useFlashcardCreate() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ deckId, flashcard }: Pick<ClientTypes, 'deckId' | 'flashcard'>) =>
      client(`/deck/${deckId}/card`, {
        data: flashcard
      }),
    {
      onSuccess: (flashcard, { deckId }) => {
        queryClient.setQueryData('deckList', (oldData: any[]) => {
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

function useFlashcardDelete() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ deckId, cardId }: Pick<ClientTypes, 'deckId' | 'cardId'>) =>
      client(`/deck/${deckId}/card/${cardId}`, {
        method: 'delete'
      }),
    {
      onMutate: ({ deckId, cardId }) => {
        const data = queryClient.getQueryData<DeckQuery>(`deck ${deckId}`);
        if (!data) return;
        // delete flashcard in cache
        data.flashcards = data.flashcards.filter((card) => card.id !== cardId);
        queryClient.setQueryData<DeckQuery>(`deck ${deckId}`, data);
        return data;
      },
      onSuccess: (data, { deckId, cardId }) => {
        queryClient.removeQueries('deckList');
      }
    }
  );
}

export {
  useDeck,
  useDeckList,
  useDeckDelete,
  useDeckCreate,
  useDeckUpdate,
  useFlashcardUpdate,
  useFlashcardCreate,
  useFlashcardDelete
};
