import { InputHTMLAttributes } from 'react';

type props = {
  type?: string;
  name: string;
  labelId: string;
  label?: string;
  placeholder?: string;
  hideLabel?: boolean;
};

export default function TextInput({
  type = 'text',
  name,
  labelId,
  label,
  hideLabel = true,
  placeholder,
  ...rest
}: props & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <label className={hideLabel ? 'sr-only' : 'block mb-2'} htmlFor={labelId}>
        {label ?? placeholder}
      </label>
      <input
        className="w-full mb-6 text-xl rounded"
        type={type}
        name={name}
        id={labelId}
        placeholder={placeholder}
        {...rest}
      />
    </>
  );
}
