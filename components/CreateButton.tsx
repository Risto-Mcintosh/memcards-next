import { motion } from 'framer-motion';
import { Menu } from '@headlessui/react';
import * as React from 'react';
import Link from 'next/link';

export default function CreateButton() {
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
                className="z-10 w-10 bg-gray-300 rounded-full shadow focus:outline-none focus-visible:outline-black"
                aria-label="Create a new deck or new flashcard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <motion.path
                    animate={open ? 'open' : 'closed'}
                    variants={variants}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </Menu.Button>

              {open && (
                <Menu.Items
                  static
                  as={motion.div}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -mt-8 text-right border shadow right-1/4 focus:outline-none -top-full"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/create-deck">
                        <a
                          href="#"
                          className={`${
                            active ? 'bg-gray-300' : ''
                          } block whitespace-nowrap px-2 py-1`}
                        >
                          Create Deck
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href="/create-flashcard">
                        <a
                          className={`${
                            active ? 'bg-gray-300' : ''
                          } block whitespace-nowrap px-2 py-1`}
                        >
                          Create Flashcard
                        </a>
                      </Link>
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
