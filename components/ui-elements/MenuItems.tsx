import * as React from 'react';
import { Menu } from '@headlessui/react';
import { motion, HTMLMotionProps } from 'framer-motion';

type props = HTMLMotionProps<'div'> & { children: React.ReactNode };

export function MenuItems({ children, className, ...delegated }: props) {
  const baseStyles =
    'border rounded shadow border-brand-400 bg-brand-100 focus:outline-none';
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
