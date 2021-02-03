import * as React from 'react';
import { Menu } from '@headlessui/react';
import Link, { LinkWrapperProps } from '@components/LinkWrapper';

type ElementProps =
  | ({
      as?: 'button';
    } & React.HTMLAttributes<HTMLButtonElement>)
  | ({
      as: 'link';
    } & LinkWrapperProps);

type MenuItemProps = {
  children: React.ReactNode;
};

type props = MenuItemProps & ElementProps;

export const MenuItem = ({ children, as = 'button', ...delegated }: props) => {
  const isButton = as === 'button';
  const Component = isButton ? 'button' : Link;
  const classes = isButton ? 'w-full' : 'block';

  return (
    <Menu.Item>
      {({ active }) => (
        <Component
          className={`${
            active ? 'bg-brand-800 bg-opacity-60' : ''
          } ${classes} text-base whitespace-nowrap p-2 border-b-2 last:border-0 border-brand-700 border-opacity-60`}
          style={{
            textAlign: 'inherit'
          }}
          {...delegated}
        >
          {children}
        </Component>
      )}
    </Menu.Item>
  );
};
