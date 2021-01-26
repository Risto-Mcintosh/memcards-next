import * as React from 'react';

type props = {
  type?: string;
  name: string;
  labelId: string;
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextInput = React.forwardRef(
  (
    { type = 'text', name, labelId, label, className, ...delegated }: props,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    return (
      <>
        <label className="block mb-2" htmlFor={labelId}>
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full h-12 mb-5 text-xl rounded md:h-auto ${className}`}
          type={type}
          name={name}
          id={labelId}
          {...delegated}
        />
      </>
    );
  }
);

export default TextInput;
