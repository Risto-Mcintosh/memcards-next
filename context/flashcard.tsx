import * as React from 'react';

type flashcardContextType = {
  deck: {
    id: string;
    name: string;
  };
  flashcard: any;
  isShowingFrontOfCard: any;
  flipCard: () => void;
  nextCard: () => void;
  clearCard: () => void;
  editFlashcard: (flashcard?: any) => void;
  initializeDeck: (initialDeck?: any) => void;
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
