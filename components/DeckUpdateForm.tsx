import { useDeckUpdate } from '@utils/client';
import { MutableRefObject } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DeckFormPopover, FormInputs } from './DeckFormPopover';

type props = {
  hideForm: () => void;
  deck: any;
  focusOnCloseEl: MutableRefObject<any>;
};

export function DeckUpdateForm({ hideForm, focusOnCloseEl, deck }: props) {
  const { mutate } = useDeckUpdate();
  const rhf = useForm<FormInputs>({
    defaultValues: {
      deckName: deck.name
    }
  });
  const onSubmit: SubmitHandler<FormInputs> = ({ deckName }) => {
    mutate(
      { deckId: deck.id, deckName },
      {
        onSuccess() {
          hideForm();
        }
      }
    );
  };

  return (
    <DeckFormPopover
      reactHookForm={rhf}
      anchorEl={focusOnCloseEl}
      onSubmit={onSubmit}
      hideForm={hideForm}
    />
  );
}
