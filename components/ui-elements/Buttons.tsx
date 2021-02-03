import * as React from 'react';

const baseStyles =
  'px-4 py-1 rounded whitespace-nowrap shadow no-underline md:h-auto';

const variants = {
  default: 'bg-brand-600 text-white',
  outline: 'border-2 border-brand-600 text-brand-800 ',
  text: 'font-semibold shadow-none',
  warn: 'bg-danger-500 text-white'
};

const sizes = {
  sm: 'text-base h-12',
  md: 'text-2xl md:text-xl h-12',
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
