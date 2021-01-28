import * as React from 'react';
import { Menu } from '@headlessui/react';
import { useFlashcardContext } from '@context/flashcard';
import { motion } from 'framer-motion';
import { useFlashcardDelete } from '@utils/client';
import { Button } from '@ui/Buttons';
import { CustomMenuItem } from '@ui/MenuItem';

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
        onSuccess: () => deleteCard()
      }
    );
  }

  React.useEffect(() => {
    // console.count('controls');
    function flashcardControls(e: KeyboardEvent) {
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
    }
    document.addEventListener('keydown', flashcardControls);
    return () => document.removeEventListener('keydown', flashcardControls);
  }, [flipCard, nextCard, editFlashcard, handleDelete]);

  return (
    <div className="flex justify-center mt-5">
      <Button size="lg" onClick={() => flipCard()}>
        Flip
      </Button>
      <Button size="lg" onClick={() => nextCard()} className="ml-4">
        Next
      </Button>
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
                  className="absolute z-10 text-left bg-white border shadow -top-14 focus:outline-none"
                >
                  <CustomMenuItem onClick={() => editFlashcard()}>
                    Edit
                  </CustomMenuItem>
                  <CustomMenuItem onClick={handleDelete}>Delete</CustomMenuItem>
                </Menu.Items>
              )}
            </>
          )}
        </Menu>
      </div>
    </div>
  );
}
