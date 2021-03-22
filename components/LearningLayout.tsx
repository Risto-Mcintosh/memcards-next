import * as React from 'react';
import { useFlashcardContext } from '@context/flashcard';
import { useFlashcardDelete } from '@utils/client';
import Head from 'next/head';
import { Button } from '@ui/Buttons';
import { Menu } from '@headlessui/react';
import { MenuItems } from '@ui/MenuItems';
import { MenuItem } from '@ui/MenuItem';
import Link from 'next/link';
import { HiDotsVertical } from 'react-icons/hi';

const KeyboardCtrl = {
  flip: 'Space',
  next: 'KeyN',
  edit: 'KeyE',
  delete: 'KeyD'
};

export function LearningLayout({ children }) {
  const {
    flipCard,
    nextCard,
    deleteCard,
    editFlashcard,
    flashcard,
    deck,
    progress
  } = useFlashcardContext();
  const { mutate } = useFlashcardDelete();

  function handleDelete() {
    mutate(
      { deckId: deck.id, cardId: flashcard.id },
      {
        onSuccess: () => {
          deleteCard();
        }
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
    <div className="flex flex-col h-screen">
      <Head>
        <title>Memcards</title>
      </Head>
      <div className="flex items-center justify-between p-4">
        <Menu as="div" className="relative">
          {({ open }) => (
            <>
              <Menu.Button
                aria-label="Flashcard Options"
                className="p-1 text-gray-600"
              >
                <HiDotsVertical className="w-6 h-6" />
              </Menu.Button>
              {open && (
                <MenuItems
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ bounce: 0, duration: 0.15 }}
                  className="absolute z-10"
                >
                  <MenuItem onClick={() => editFlashcard()}>Edit</MenuItem>
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </MenuItems>
              )}
            </>
          )}
        </Menu>
        <div className="relative flex-1 h-3 max-w-lg overflow-hidden bg-gray-300 rounded-lg shadow-inner">
          <div
            className="absolute inset-y-0 bg-gradient-to-tr from-brand-600 to-brand-200"
            style={{
              width: progress + '%'
            }}
          ></div>
        </div>
        <nav>
          <Link href="/decks">
            <a>cancel</a>
          </Link>
        </nav>
      </div>
      <main className="flex-1 px-2 overflow-x-hidden overflow-y-auto bg-gray-100">
        {children}
      </main>
      <div className="py-3">
        <div className="flex justify-around max-w-md mx-auto">
          <Button size="lg" variant="outline" onClick={() => flipCard()}>
            Flip
          </Button>
          <Button size="lg" onClick={() => nextCard()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
