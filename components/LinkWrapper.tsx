/* 
  Forwards a ref to the anchor tag.
  Needed for HeadlessUi's <Menu.Item> component 
*/
import Link from 'next/link';
import React from 'react';

type props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};
const LinkWrapper = React.forwardRef(
  (
    { href, children, ...props }: props,
    ref: React.RefObject<HTMLAnchorElement>
  ) => {
    return (
      <Link href={href}>
        <a ref={ref} {...props}>
          {children}
        </a>
      </Link>
    );
  }
);

export default LinkWrapper;
