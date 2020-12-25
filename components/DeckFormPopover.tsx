import { Popover } from '@components/Popover';
import { SubmitHandler, UseFormMethods } from 'react-hook-form';
import TextInput from './TextInput';

export type FormInputs = {
  deckName: string;
};

type props = {
  reactHookForm: UseFormMethods<FormInputs>;
  onSubmit: SubmitHandler<FormInputs>;
  hideForm: () => void;
  anchorEl: React.MutableRefObject<any>;
};

export function DeckFormPopover({
  anchorEl,
  onSubmit,
  hideForm,
  reactHookForm
}: props) {
  const { register, handleSubmit } = reactHookForm;
  return (
    <Popover anchorEl={anchorEl} onClose={hideForm} container>
      {({ focusOnMountEl }) => (
        <>
          <form id="create-deck-form" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              ref={(ref) => {
                focusOnMountEl.current = ref;
                register(ref);
              }}
              name="deckName"
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
              onClick={() => hideForm()}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </Popover>
  );
}
