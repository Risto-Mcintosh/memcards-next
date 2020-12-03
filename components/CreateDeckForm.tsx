import FocusTrap from 'focus-trap-react';
import { useCallback, useEffect, useRef } from 'react';
import { useOnClickOutside } from 'utils/useOnClickOutside';
import TextInput from './TextInput';

type props = {
  hideCreateDeckForm: () => void;
};
export default function CreateDeckForm({ hideCreateDeckForm }: props) {
  const containerRef = useRef();
  const inputRef = useRef(null);
  useOnClickOutside(containerRef, () => hideCreateDeckForm());

  const escFunction = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      hideCreateDeckForm();
    }
  }, []);

  useEffect(() => {
    inputRef.current.focus();
    document.addEventListener('keydown', escFunction);
    return () => document.removeEventListener('keydown', escFunction);
  }, []);

  return (
    <FocusTrap>
      <div
        ref={containerRef}
        className="absolute inset-x-0 top-0 px-3 py-6 bg-white border-2 rounded shadow-lg"
      >
        <form id="create-deck-form">
          <TextInput
            ref={inputRef}
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
    </FocusTrap>
  );
}
