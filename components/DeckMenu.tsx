import * as React from 'react';
import { Menu } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Popover } from './Popover';
import { DeckUpdateForm } from './DeckUpdateForm';
import { useDeckDelete } from '@utils/client';
import { Button } from '@ui/Buttons';
import { MenuItem } from '@ui/MenuItem';
import { MenuItems } from '@ui/MenuItems';

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
              <MenuItems
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ bounce: 0, duration: 0.15 }}
                className="absolute top-0 right-0 z-10"
              >
                <MenuItem onClick={() => setEdit(true)}>Rename</MenuItem>
                <MenuItem onClick={() => setDeleteConfirm(true)}>
                  Delete
                </MenuItem>
              </MenuItems>
            )}
          </>
        )}
      </Menu>
      {isDeleteConfirmOpen && (
        <Popover onClose={() => setDeleteConfirm(false)}>
          {(containerRef) => (
            <div
              ref={containerRef}
              className="absolute inset-x-0 top-0 z-10 px-3 py-3 bg-white border-4 rounded-lg shadow-lg border-danger-500"
            >
              <p className="text-center">
                Are you sure you want to delete <strong>{deck.name}</strong>?
              </p>
              <div className="flex justify-around mt-2">
                <Button
                  className="text-white bg-danger-500"
                  onClick={() =>
                    onDeckDelete(deck.id, {
                      onSuccess: () => setDeleteConfirm(false)
                    })
                  }
                >
                  Yes
                </Button>
                <Button
                  className="font-semibold text-danger-500"
                  variant="text"
                  onClick={() => setDeleteConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
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
