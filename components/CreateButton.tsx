import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from '@headlessui/react';
import * as React from 'react';

export default function CreateButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const variants = {
    open: { rotate: 225 },
    closed: { rotate: 0 }
  };
  return (
    <div className="absolute bottom-0 right-0 mb-8 mr-8">
      <div className="relative flex flex-col items-center">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button
                className="z-10 w-12 mt-3 focus:outline-none focus-visible:outline-black"
                aria-label="Create a new deck or new flashcard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="origin-bottom-right stroke-1"
                >
                  <motion.path
                    animate={open ? 'open' : 'closed'}
                    variants={variants}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Menu.Button>

              {open && (
                <Menu.Items
                  static
                  as={motion.div}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute text-right border shadow right-1/4 focus:outline-none -top-full"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${
                          active ? 'bg-gray-300' : ''
                        } block whitespace-nowrap px-2 py-1`}
                      >
                        Create Deck
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${
                          active ? 'bg-gray-300' : ''
                        } block whitespace-nowrap px-2 py-1`}
                      >
                        Create Flashcard
                      </a>
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
