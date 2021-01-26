import * as React from 'react';

const baseStyles =
  'px-4 py-2 rounded whitespace-nowrap no-underline h-12 md:h-auto';

const variants = {
  default: 'bg-gray-400',
  outline: 'border-2 border-gray-400'
};

const sizes = {
  sm: 'text-base',
  md: 'text-2xl md:text-xl',
  lg: 'text-3xl h-14'
};

type props = {
  size?: 'md' | 'lg' | 'sm';
  variant?: 'default' | 'outline';
  ref?: React.MutableRefObject<HTMLButtonElement>;
  children: React.ReactChild;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef(
  ({
    size = 'md',
    variant = 'default',
    children,
    ref,
    className,
    ...delegated
  }: props) => {
    const classes = `${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`;
    return (
      <button ref={ref} className={classes} {...delegated}>
        {children}
      </button>
    );
  }
);
