/* 
  Forwards a ref to the anchor tag.
  Needed for HeadlessUi's <Menu.Item> component 
*/
import Link from 'next/link';
import React from 'react';

export type LinkWrapperProps = {
  href: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const LinkWrapper = React.forwardRef(
  (
    { href, children, ...delegated }: LinkWrapperProps,
    ref: React.RefObject<HTMLAnchorElement>
  ) => {
    return (
      <Link href={href}>
        <a ref={ref} {...delegated}>
          {children}
        </a>
      </Link>
    );
  }
);

export default LinkWrapper;
