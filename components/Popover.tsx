import FocusTrap from 'focus-trap-react';
import * as React from 'react';
import { usePopover } from 'utils/usePopover';

interface children {
  focusOnMountEl: React.MutableRefObject<any>;
  containerRef: React.MutableRefObject<any>;
}

type props = {
  anchorEl: React.MutableRefObject<any>;
  onClose: () => void;
  container?: boolean;
  children:
    | React.ReactNode
    | (({ containerRef, focusOnMountEl }: children) => React.ReactNode);
};

export function Popover({
  anchorEl,
  onClose,
  container = false,
  children
}: props) {
  const containerRef = React.useRef();
  const focusOnMountEl = React.useRef(null);
  usePopover({
    containerRef,
    focusOnMountEl,
    anchorEl,
    onClose
  });

  const content =
    typeof children === 'function'
      ? children({ containerRef, focusOnMountEl })
      : children;
  return (
    <FocusTrap>
      {container ? (
        <div
          ref={containerRef}
          className="absolute inset-x-0 top-0 z-10 px-3 py-6 bg-white border-2 rounded shadow-lg"
        >
          {content}
        </div>
      ) : (
        <>content</>
      )}
    </FocusTrap>
  );
}