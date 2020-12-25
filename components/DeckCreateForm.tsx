import { useDeckCreate } from '@utils/client';
import { MutableRefObject } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DeckFormPopover, FormInputs } from './DeckFormPopover';

type props = {
  hideForm: () => void;
  focusOnCloseEl: MutableRefObject<any>;
};

export default function CreateDeckForm({ hideForm, focusOnCloseEl }: props) {
  const { mutate } = useDeckCreate();
  const rhf = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log({ data });
    mutate(data, {
      onSuccess() {
        hideForm();
      }
    });
  };

  return (
    <DeckFormPopover
      reactHookForm={rhf}
      hideForm={hideForm}
      anchorEl={focusOnCloseEl}
      onSubmit={onSubmit}
    />
  );
}
