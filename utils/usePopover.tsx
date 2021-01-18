import * as React from 'react';
import { useOnClickOutside } from './useOnClickOutside';

type UsePopover = {
  containerRef: React.MutableRefObject<any>;
  anchorEl?: React.MutableRefObject<any>;
  onClose: () => void;
};

function usePopover({ containerRef, onClose, anchorEl = null }: UsePopover) {
  useOnClickOutside(containerRef, () => onClose());

  const escFunction = React.useCallback((e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      onClose();
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener('keydown', escFunction);
    return () => {
      anchorEl?.current?.focus();
      document.removeEventListener('keydown', escFunction);
    };
  }, [anchorEl]);
}

export { usePopover };
