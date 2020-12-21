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
  children: ({ containerRef, focusOnMountEl }: children) => React.ReactNode;
};

export function Popover({ anchorEl, onClose, children }: props) {
  const containerRef = React.useRef();
  const focusOnMountEl = React.useRef(null);
  usePopover({
    containerRef,
    focusOnMountEl,
    anchorEl,
    onClose
  });

  return <FocusTrap>{children({ containerRef, focusOnMountEl })}</FocusTrap>;
}
