import * as React from 'react';
import { Menu } from '@headlessui/react';
import { useFlashcardContext } from '@context/flashcard';
import { motion } from 'framer-motion';
import { DeckQuery, useFlashcardDelete } from '@utils/client';
import { useQueryClient } from 'react-query';

const KeyboardCtrl = {
  flip: 'Space',
  next: 'KeyN',
  edit: 'KeyE',
  delete: 'KeyD'
};

export function Controls() {
  const {
    flipCard,
    nextCard,
    deleteCard,
    editFlashcard,
    flashcard,
    deck
  } = useFlashcardContext();
  const { mutate } = useFlashcardDelete();

  function handleDelete() {
    mutate(
      { deckId: deck.id, cardId: flashcard.id },
      {
        onSuccess: (data, { deckId, cardId }, context) => {
          deleteCard(context.flashcards);
        }
      }
    );
  }

  const flashcardControls = (e: KeyboardEvent) => {
    switch (e.code) {
      case KeyboardCtrl.flip:
        flipCard();
        break;
      case KeyboardCtrl.next:
        nextCard();
        break;
      case KeyboardCtrl.edit:
        editFlashcard();
        break;
      case KeyboardCtrl.delete:
        handleDelete();
        break;
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', flashcardControls);
    return () => document.removeEventListener('keydown', flashcardControls);
  }, [flashcard]);

  return (
    <div className="flex justify-center mt-5">
      <button
        onClick={() => flipCard()}
        className="px-8 py-3 text-3xl text-white bg-gray-600 rounded-xl"
      >
        Flip
      </button>
      <button
        onClick={() => nextCard()}
        className="px-8 py-3 ml-4 text-3xl text-white bg-gray-600 rounded-xl"
      >
        Next
      </button>
      <div className="relative ml-4">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button
                aria-label="Flashcard Menu"
                className="w-10 p-1 text-white bg-gray-600"
              >
                OP
              </Menu.Button>
              {open && (
                <Menu.Items
                  as={motion.div}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ bounce: 0, duration: 0.15 }}
                  static
                  className="absolute z-10 bg-white border shadow -top-14 focus:outline-none"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => editFlashcard()}
                        className={`text-lg p-1 text-left w-full ${
                          active ? 'bg-gray-400' : ''
                        }`}
                      >
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleDelete}
                        className={`text-lg p-1 text-left w-full ${
                          active ? 'bg-gray-400' : ''
                        }`}
                      >
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              )}
            </>
          )}
        </Menu>
      </div>
    </div>
  );
}
