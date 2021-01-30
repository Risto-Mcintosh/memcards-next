import * as React from 'react';

const baseStyles =
  'px-4 py-2 rounded whitespace-nowrap no-underline h-12 md:h-auto';

const variants = {
  default: 'bg-gray-400',
  outline: 'border-2 border-gray-400',
  text: ''
};

const sizes = {
  sm: 'text-base',
  md: 'text-2xl md:text-xl',
  lg: 'text-3xl h-14'
};

type props = {
  size?: 'md' | 'lg' | 'sm';
  variant?: keyof typeof variants;
  children: React.ReactChild;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef(
  (
    {
      size = 'md',
      variant = 'default',
      children,
      className,
      style,
      ...delegated
    }: props,
    ref: React.MutableRefObject<HTMLButtonElement>
  ) => {
    const classes = `${baseStyles} ${sizes[size]} ${variants[variant]} ${
      className ?? ''
    }`;
    return (
      <button
        ref={ref}
        className={classes}
        style={{ minWidth: '5.5rem', ...style }}
        {...delegated}
      >
        {children}
      </button>
    );
  }
);
