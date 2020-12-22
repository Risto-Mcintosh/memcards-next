import * as React from 'react';
import { Menu } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Popover } from './Popover';
import { PopoverForm } from './PopoverForm';

type props = {
  deck: any;
};

export default function DeckMenu({ deck }: props) {
  const [isDeleteConfirmOpen, setDeleteConfirm] = React.useState(false);
  const [isEditing, setEdit] = React.useState(false);
  const anchorEl = React.useRef(null);

  return (
    <div>
      <Menu as="div" className="relative">
        {({ open }) => (
          <>
            <Menu.Button
              // @ts-ignore
              ref={anchorEl}
              aria-label="Deck menu"
              className="w-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                focusable="false"
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
                    <button
                      onClick={() => setEdit(true)}
                      className={`${
                        active ? 'bg-gray-300 ' : ''
                      } w-full p-2 text-lg whitespace-nowrap`}
                    >
                      Rename
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setDeleteConfirm(true)}
                      className={`${
                        active ? 'bg-gray-300 ' : ''
                      } w-full p-2 text-lg whitespace-nowrap`}
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
      {isDeleteConfirmOpen && (
        <Popover
          anchorEl={anchorEl}
          onClose={() => setDeleteConfirm(false)}
          container
        >
          <p className="text-center">
            Are you sure you want to delete <strong>{deck.name}</strong>?
          </p>
          <div className="flex justify-around mt-2">
            <button
              className="px-5 py-1 text-lg bg-gray-400 rounded"
              onClick={() => console.log('deck deleted!')}
            >
              Yes
            </button>
            <button
              className="px-5 py-1 text-lg border-2 border-gray-400 rounded"
              onClick={() => setDeleteConfirm(false)}
            >
              Cancel
            </button>
          </div>
        </Popover>
      )}

      {isEditing && (
        <PopoverForm
          anchorEl={anchorEl}
          formId="edit-deck-name"
          inputName="deck-name"
          label="Deck Name"
          hideForm={() => setEdit(false)}
          // TODO Pass down deckName for input value
        />
      )}
    </div>
  );
}
