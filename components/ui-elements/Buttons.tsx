import * as React from 'react';

const baseStyles =
  'px-5 py-3 rounded whitespace-nowrap leading-none no-underline';

const variants = {
  default: 'bg-gray-400',
  outline: 'border-2 border-gray-400'
};

const sizes = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-2xl'
};

type props = {
  size?: 'md' | 'lg' | 'sm';
  variant?: 'default' | 'outline';
  ref?: React.MutableRefObject<HTMLButtonElement>;
  children: React.ReactChild;
};

export const Button = React.forwardRef(
  ({
    size = 'md',
    variant = 'default',
    children,
    ref,
    className,
    ...props
  }: props & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const classes = `${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`;
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
