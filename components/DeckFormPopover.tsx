import { Popover } from "@components/Popover";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import TextInput from "@ui/TextInput";
import { Button } from "@ui/Buttons";

export type FormInputs = {
  deckName: string;
};

type props = {
  reactHookForm: UseFormReturn<FormInputs>;
  onSubmit: SubmitHandler<FormInputs>;
  hideForm: () => void;
  anchorEl: React.MutableRefObject<any>;
};

export function DeckFormPopover({
  anchorEl,
  onSubmit,
  hideForm,
  reactHookForm,
}: props) {
  const { register, handleSubmit } = reactHookForm;
  return (
    <Popover anchorEl={anchorEl} onClose={hideForm} container>
      <form id="create-deck-form" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          autoFocus
          name="deckName"
          labelId="deck-name"
          label="Deck Name:"
          {...register("deckName")}
        />
      </form>
      <div className="flex justify-around">
        <Button type="submit" form="create-deck-form">
          Submit
        </Button>
        <Button
          variant="text"
          className="text-brand-800"
          onClick={() => hideForm()}
        >
          Cancel
        </Button>
      </div>
    </Popover>
  );
}
