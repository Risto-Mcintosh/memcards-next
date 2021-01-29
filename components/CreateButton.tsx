import { motion } from 'framer-motion';
import { Menu } from '@headlessui/react';
import * as React from 'react';
import LinkWrapper from './LinkWrapper';
import { MenuItem } from '@ui/MenuItem';
import { MenuItems } from '@ui/MenuItems';

type props = {
  showCreateDeckForm: () => void;
};

const CreateButton = React.forwardRef(
  (
    { showCreateDeckForm }: props,
    ref: React.MutableRefObject<HTMLButtonElement>
  ) => {
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
                  as="button"
                  // @ts-ignore
                  ref={ref}
                  className="z-10 w-10 text-gray-900 rounded-full shadow-lg bg-brand-500 focus:outline-none focus-visible:outline-black"
                  aria-label="Create a new deck or new flashcard"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
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
                  <MenuItems
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-10 mb-1 text-right bottom-full right-2/4"
                  >
                    <MenuItem onClick={() => showCreateDeckForm()}>
                      Create Deck
                    </MenuItem>
                    <MenuItem as="link" href="/create-flashcard">
                      Create Flashcard
                    </MenuItem>
                  </MenuItems>
                )}
              </>
            )}
          </Menu>
        </div>
      </div>
    );
  }
);

export default CreateButton;
