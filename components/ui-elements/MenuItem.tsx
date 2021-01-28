import * as React from 'react';
import Link, { LinkWrapperProps } from '@components/LinkWrapper';
import { Menu } from '@headlessui/react';

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

export const CustomMenuItem = ({
  children,
  as = 'button',
  ...delegated
}: props) => {
  const isButton = as === 'button';
  const Component = isButton ? 'button' : Link;
  const classes = isButton
    ? 'w-full p-2 whitespace-nowrap'
    : 'block whitespace-nowrap p-2';

  return (
    <Menu.Item>
      {({ active }) => (
        <Component
          className={`${active ? 'bg-gray-300 ' : ''} ${classes} text-base`}
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
