import React from 'react';
import shuffle from 'lodash.shuffle';
import { Flashcard } from 'types';

const actionTypes = {
  initialize: 'INITIALIZE_DECK',
  flip: 'FLIP_CARD',
  edit: 'EDIT_FLASHCARD',
  nextCard: 'GET_NEXT_FLASHCARD',
  deleteCard: 'DELETE_CARD',
  clear: 'CLEAR_CARD'
};

function getFlashCardFromDeck(deck) {
  const shuffledDeck = deck;
  const flashcard = shuffledDeck.pop();
  return {
    shuffledDeck,
    flashcard
  };
}

function getNextCard(state: flashcardState, deck?: Flashcard[]) {
  const { shuffledDeck, flashcard } = getFlashCardFromDeck(state.shuffledDeck);
  const currentDeckLength = deck?.length ?? state.currentDeck.length;
  console.log({ currentDeckLength, deck, flashcard });
  return {
    ...state,
    shuffledDeck,
    flashcard,
    isShowingFrontOfCard: true,
    isDeckEmpty: state.currentDeck.length === 0,
    noCardsLeftToStudy: currentDeckLength >= 1 && !flashcard ? true : false
  };
}

type flashcardState = {
  currentDeck: Flashcard[];
  shuffledDeck: Flashcard[];
  flashcard: Flashcard;
  isDeckEmpty: boolean;
  isShowingFrontOfCard: boolean;
  isEditing: boolean;
  noCardsLeftToStudy: boolean;
};

function flashcardReducer(state: flashcardState, action) {
  switch (action.type) {
    case actionTypes.initialize: {
      let currentDeck = state.currentDeck;
      if (action.initialDeck.length) {
        currentDeck = action.initialDeck;
      }
      const { shuffledDeck, flashcard } = getFlashCardFromDeck(
        shuffle(currentDeck)
      );
      return {
        ...state,
        currentDeck,
        shuffledDeck,
        flashcard,
        isEditing: false,
        isShowingFrontOfCard: true,
        noCardsLeftToStudy: false,
        isDeckEmpty: currentDeck.length === 0
      };
    }
    case actionTypes.nextCard: {
      return getNextCard(state);
    }
    case actionTypes.deleteCard: {
      const currentDeck = action.currentDeck;
      return {
        ...getNextCard(state, currentDeck),
        currentDeck,
        isDeckEmpty: currentDeck.length === 0
      };
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
    case actionTypes.clear:
      return { ...state, flashcard: null };
    case actionTypes.flip:
      return { ...state, isShowingFrontOfCard: !state.isShowingFrontOfCard };
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

function useFlashcards(deck = []) {
  const [
    {
      flashcard,
      isEditing,
      noCardsLeftToStudy,
      isShowingFrontOfCard,
      isDeckEmpty
    },
    dispatch
  ] = React.useReducer(flashcardReducer, {
    currentDeck: deck,
    shuffledDeck: [],
    flashcard: null,
    isDeckEmpty: false,
    isShowingFrontOfCard: true,
    isEditing: false,
    noCardsLeftToStudy: false
  });

  const initialize = React.useCallback(
    (initialDeck = []) =>
      dispatch({ type: actionTypes.initialize, initialDeck }),
    [dispatch]
  );
  const nextCard = () => dispatch({ type: actionTypes.nextCard });
  const deleteCard = (currentDeck: Flashcard[]) =>
    dispatch({ type: actionTypes.deleteCard, currentDeck });
  const editFlashcard = (flashcard = null) =>
    dispatch({ type: actionTypes.edit, flashcard });
  const flipCard = () => dispatch({ type: actionTypes.flip });
  const clearCard = () => dispatch({ type: actionTypes.clear });

  return {
    flashcard,
    isShowingFrontOfCard,
    flipCard,
    nextCard,
    deleteCard,
    clearCard,
    isDeckEmpty,
    noCardsLeftToStudy,
    isEditing,
    editFlashcard,
    initialize
  };
}

export { useFlashcards };
