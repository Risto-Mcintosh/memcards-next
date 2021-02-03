import * as React from 'react';
import { Menu } from '@headlessui/react';
import { motion, HTMLMotionProps } from 'framer-motion';

type props = HTMLMotionProps<'div'> & { children: React.ReactNode };

export function MenuItems({ children, className, ...delegated }: props) {
  const baseStyles =
    'border rounded shadow border-brand-700 bg-brand-500 focus:outline-none text-gray-100';
  return (
    <Menu.Items
      as={motion.div}
      className={`${baseStyles} ${className}`}
      {...delegated}
      static
    >
      {children}
    </Menu.Items>
  );
}
