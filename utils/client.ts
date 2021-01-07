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
  deck: Deck;
}

export type DeckQuery = Partial<Deck> & { flashcards: Flashcard[] };

function useDeck(deckId: string | string[]) {
  return useQuery(`deck ${deckId}`, () => {
    if (!deckId) return Promise.reject('no endpoint');

    return client(`/deck/${deckId}`);
  });
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

function useDeckUpdate() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ deckId, flashcard }: Pick<ClientTypes, 'deckId' | 'flashcard'>) =>
      client(`/deck/${deckId}`, {
        data: flashcard,
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
      onSuccess: (data, { deckId, cardId }) => {
        queryClient.removeQueries('deckList');
        // delete flashcard in cache
        queryClient.setQueryData<DeckQuery>(`deck ${deckId}`, (oldData) => {
          const result = { ...oldData };
          result.flashcards = result.flashcards.filter(
            (card) => card.id !== cardId
          );
          return result;
        });
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
