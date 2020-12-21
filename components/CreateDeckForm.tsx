import * as React from 'react';
import { Popover } from './Popover';
import TextInput from './TextInput';

type props = {
  hideCreateDeckForm: () => void;
  anchorEl: React.MutableRefObject<any>;
};

export default function CreateDeckForm({
  hideCreateDeckForm,
  anchorEl
}: props) {
  return (
    <Popover anchorEl={anchorEl} onClose={hideCreateDeckForm}>
      {({ containerRef, focusOnMountEl }) => (
        <div
          ref={containerRef}
          className="absolute inset-x-0 top-0 px-3 py-6 bg-white border-2 rounded shadow-lg"
        >
          <form id="create-deck-form">
            <TextInput
              ref={focusOnMountEl}
              name="deck-name"
              labelId="deck-name"
              label="Deck Name"
            />
          </form>
          <div className="flex justify-around">
            <button
              type="submit"
              form="create-deck-form"
              className="px-5 py-1 text-lg bg-gray-400 rounded"
            >
              Submit
            </button>
            <button
              className="px-5 py-1 text-lg border-2 border-gray-400 rounded"
              onClick={() => hideCreateDeckForm()}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Popover>
  );
}
