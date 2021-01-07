import * as React from 'react';
import { Flashcard } from 'types';

type flashcardContextType = {
  deck: {
    id: string;
    name: string;
  };
  flashcard: any;
  isShowingFrontOfCard: any;
  flipCard: () => void;
  nextCard: () => void;
  deleteCard: (currentDeck: Flashcard[]) => void;
  clearCard: () => void;
  editFlashcard: (flashcard?: any) => void;
  initialize: (initialDeck?: any) => void;
};

const FlashcardContext = React.createContext<flashcardContextType>(null);

type props = {
  children: React.ReactNode;
  state: flashcardContextType;
};

function FlashcardProvider({ children, state }: props) {
  return (
    <FlashcardContext.Provider value={state}>
      {children}
    </FlashcardContext.Provider>
  );
}

const useFlashcardContext = () => React.useContext(FlashcardContext);

export { FlashcardProvider, useFlashcardContext };
