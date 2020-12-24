import { useDeckCreate } from '@utils/client';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Popover } from './Popover';
import TextInput from './TextInput';

type props = {
  hideCreateDeckForm: () => void;
  anchorEl: React.MutableRefObject<any>;
};

type FormInput = {
  deckName: string;
};

export default function CreateDeckForm({
  hideCreateDeckForm,
  anchorEl
}: props) {
  const { mutate } = useDeckCreate();
  const { register, handleSubmit } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log({ data });
    mutate(data, {
      onSuccess() {
        hideCreateDeckForm();
      }
    });
  };

  return (
    <Popover anchorEl={anchorEl} onClose={hideCreateDeckForm} container>
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
              onClick={() => hideCreateDeckForm()}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </Popover>
  );
}
