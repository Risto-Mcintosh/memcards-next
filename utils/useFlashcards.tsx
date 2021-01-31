import React from 'react';
import shuffle from 'lodash.shuffle';
import { Flashcard } from 'types';

const actionTypes = {
  setCurrentDeck: 'SET_CURRENT_DECK',
  initialize: 'INITIALIZE_DECK',
  flip: 'FLIP_CARD',
  edit: 'EDIT_FLASHCARD',
  nextCard: 'GET_NEXT_FLASHCARD',
  deleteCard: 'DELETE_CARD',
  clear: 'CLEAR_CARD'
};

function getFlashCardFromDeck(deck: Flashcard[]) {
  const shuffledDeck = deck;
  const flashcard = shuffledDeck.pop();
  return {
    shuffledDeck,
    flashcard
  };
}

function getNextCard(state: flashcardState) {
  const { shuffledDeck, flashcard } = getFlashCardFromDeck(state.shuffledDeck);
  const currentDeckLength = state.currentDeck.length;
  return {
    ...state,
    shuffledDeck,
    flashcard,
    isShowingFrontOfCard: true,
    isDeckEmpty: currentDeckLength === 0,
    noCardsLeftToStudy: currentDeckLength >= 1 && !flashcard ? true : false,
    progress: getProgress(shuffledDeck.length, currentDeckLength)
  };
}

const getProgress = (cardsLeft: number, deckSize: number) => {
  return ((deckSize - cardsLeft) * 100) / deckSize;
};

type flashcardState = {
  currentDeck: Flashcard[];
  shuffledDeck: Flashcard[];
  flashcard: Flashcard;
  isDeckEmpty: boolean;
  isShowingFrontOfCard: boolean;
  isEditing: boolean;
  noCardsLeftToStudy: boolean;
  progress: number;
};

function flashcardReducer(state: flashcardState, action) {
  switch (action.type) {
    case actionTypes.initialize: {
      const { shuffledDeck, flashcard } = getFlashCardFromDeck(
        shuffle(state.currentDeck)
      );
      return {
        ...state,
        shuffledDeck,
        flashcard,
        isShowingFrontOfCard: true,
        noCardsLeftToStudy: false,
        isDeckEmpty: state.currentDeck.length === 0,
        progress: getProgress(shuffledDeck.length, state.currentDeck.length)
      };
    }
    case actionTypes.nextCard: {
      return getNextCard(state);
    }
    case actionTypes.deleteCard: {
      return getNextCard(state);
    }
    case actionTypes.edit: {
      if (action.flashcard) {
        return {
          ...state,
          flashcard: action.flashcard,
          isEditing: false
        };
      }
      return { ...state, isEditing: true };
    }
    case actionTypes.flip:
      return { ...state, isShowingFrontOfCard: !state.isShowingFrontOfCard };
    case actionTypes.setCurrentDeck:
      return { ...state, currentDeck: action.currentDeck };
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

function useFlashcards(currentDeck = []) {
  const [
    {
      flashcard,
      isEditing,
      noCardsLeftToStudy,
      isShowingFrontOfCard,
      isDeckEmpty,
      progress
    },
    dispatch
  ] = React.useReducer(flashcardReducer, {
    currentDeck,
    shuffledDeck: [],
    flashcard: null,
    isDeckEmpty: false,
    isShowingFrontOfCard: true,
    isEditing: false,
    noCardsLeftToStudy: false,
    progress: 0
  });

  const initialize = React.useCallback(
    () => dispatch({ type: actionTypes.initialize }),
    [dispatch]
  );

  const editFlashcard = (flashcard = null) =>
    dispatch({ type: actionTypes.edit, flashcard });

  const deleteCard = () => dispatch({ type: actionTypes.deleteCard });

  const nextCard = () => dispatch({ type: actionTypes.nextCard });

  const flipCard = () => dispatch({ type: actionTypes.flip });

  const currentDeckLength = currentDeck.length;
  const prevDeckLength = React.useRef<number>(currentDeckLength);
  React.useEffect(() => {
    if (prevDeckLength.current !== currentDeckLength) {
      // console.count('setDeck');
      prevDeckLength.current = currentDeckLength;
      dispatch({ type: actionTypes.setCurrentDeck, currentDeck });
    }
  }, [currentDeckLength, prevDeckLength, dispatch, currentDeck]);
  return {
    isShowingFrontOfCard,
    isDeckEmpty,
    isEditing,
    noCardsLeftToStudy,
    flashcard,
    progress,
    flipCard,
    nextCard,
    deleteCard,
    editFlashcard,
    initialize
  };
}

export { useFlashcards };
