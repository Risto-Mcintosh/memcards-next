import { Menu } from '@headlessui/react';
import { useFlashcardContext } from '@context/flashcard';
import { motion } from 'framer-motion';

export function Controls() {
  const { flipCard, nextCard, editFlashcard } = useFlashcardContext();
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
