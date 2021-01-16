import * as React from 'react';
import { useOnClickOutside } from './useOnClickOutside';

function usePopover({ containerRef, onClose, anchorEl }) {
  useOnClickOutside(containerRef, () => onClose());

  const escFunction = React.useCallback((e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      onClose();
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener('keydown', escFunction);
    return () => {
      anchorEl.current.focus();
      document.removeEventListener('keydown', escFunction);
    };
  }, [anchorEl]);
}

export { usePopover };
