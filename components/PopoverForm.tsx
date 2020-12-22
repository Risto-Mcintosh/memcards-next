import * as React from 'react';
import { Popover } from './Popover';
import TextInput from './TextInput';

type props = {
  hideForm: () => void;
  formId: string;
  label: string;
  inputName: string;
  anchorEl: React.MutableRefObject<any>;
};

export function PopoverForm({
  formId,
  inputName,
  label,
  hideForm,
  anchorEl
}: props) {
  return (
    <Popover anchorEl={anchorEl} onClose={hideForm} container>
      {({ focusOnMountEl }) => (
        <>
          <form id={formId}>
            <TextInput
              ref={focusOnMountEl}
              name={inputName}
              labelId={inputName}
              label={label}
            />
          </form>
          <div className="flex justify-around">
            <button
              type="submit"
              form={formId}
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
