import { Menu } from '@headlessui/react';
import { motion } from 'framer-motion';
export default function DeckMenu() {
  return (
    <div className="relative">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button aria-label="Deck menu" className="w-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </Menu.Button>

            {open && (
              <Menu.Items
                as={motion.div}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ bounce: 0, duration: 0.15 }}
                static
                className="absolute top-0 right-0 z-10 bg-white border shadow focus:outline-none"
              >
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active ? 'bg-gray-300 ' : ''
                      } block p-2 text-lg whitespace-nowrap`}
                    >
                      Rename
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active ? 'bg-gray-300 ' : ''
                      } block p-2 text-lg whitespace-nowrap`}
                    >
                      Delete
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            )}
          </>
        )}
      </Menu>
    </div>
  );
}
