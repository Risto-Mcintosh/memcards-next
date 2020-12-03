import React, { RefObject } from 'react';
import { InputHTMLAttributes } from 'react';

type props = {
  type?: string;
  name: string;
  labelId: string;
  label?: string;
};

const TextInput = React.forwardRef(
  (
    {
      type = 'text',
      name,
      labelId,
      label,
      ...rest
    }: props & InputHTMLAttributes<HTMLInputElement>,
    ref: RefObject<HTMLInputElement>
  ) => {
    const { className, ...props } = rest;
    return (
      <>
        <label className="block mb-2" htmlFor={labelId}>
          {label}
        </label>
        <input
          ref={ref}
          className={className ?? 'w-full mb-6 text-xl rounded'}
          type={type}
          name={name}
          id={labelId}
          {...props}
        />
      </>
    );
  }
);

export default TextInput;
