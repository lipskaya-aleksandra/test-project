import { useCallback, useState } from 'react';

export default function useMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const onClick = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, []);
  const onClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return { anchorEl, isOpen, onClick, onClose };
}
