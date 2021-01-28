import * as React from 'react';
import { Menu } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Popover } from './Popover';
import { DeckUpdateForm } from './DeckUpdateForm';
import { useDeckDelete } from '@utils/client';
import { Button } from '@ui/Buttons';
import { CustomMenuItem } from '@ui/MenuItem';

type props = {
  deck: any;
};

export default function DeckMenu({ deck }: props) {
  const [isDeleteConfirmOpen, setDeleteConfirm] = React.useState(false);
  const { mutate: onDeckDelete } = useDeckDelete();
  const [isEditing, setEdit] = React.useState(false);
  const anchorEl = React.useRef();

  return (
    <>
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
                aria-hidden="true"
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
                <CustomMenuItem onClick={() => setEdit(true)}>
                  Rename
                </CustomMenuItem>
                <CustomMenuItem onClick={() => setDeleteConfirm(true)}>
                  Delete
                </CustomMenuItem>
              </Menu.Items>
            )}
          </>
        )}
      </Menu>
      {isDeleteConfirmOpen && (
        <Popover onClose={() => setDeleteConfirm(false)} container>
          <p className="text-center">
            Are you sure you want to delete <strong>{deck.name}</strong>?
          </p>
          <div className="flex justify-around mt-2">
            <Button
              onClick={() =>
                onDeckDelete(deck.id, {
                  onSuccess: () => setDeleteConfirm(false)
                })
              }
            >
              Yes
            </Button>
            <Button variant="outline" onClick={() => setDeleteConfirm(false)}>
              Cancel
            </Button>
          </div>
        </Popover>
      )}

      {isEditing && (
        <DeckUpdateForm
          focusOnCloseEl={anchorEl}
          hideForm={() => setEdit(false)}
          deck={deck}
        />
      )}
    </>
  );
}
