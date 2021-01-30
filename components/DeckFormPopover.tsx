import { Popover } from '@components/Popover';
import { SubmitHandler, UseFormMethods } from 'react-hook-form';
import TextInput from '@ui/TextInput';
import { Button } from './ui-elements/Buttons';

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
      <form id="create-deck-form" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          ref={register}
          autoFocus
          name="deckName"
          labelId="deck-name"
          label="Deck Name:"
        />
      </form>
      <div className="flex justify-around">
        <Button type="submit" form="create-deck-form">
          Submit
        </Button>
        <Button variant="outline" onClick={() => hideForm()}>
          Cancel
        </Button>
      </div>
    </Popover>
  );
}
