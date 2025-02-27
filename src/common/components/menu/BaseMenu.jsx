import { IconButton, Menu, Tooltip } from '@mui/material';
import { Fragment } from 'react';

import useMenu from '../../hooks/useMenu';

export default function BaseMenu({
  tooltipTitle,
  children,
  MenuIcon,
  iconSx,
  arrowPosition,
  ...props
}) {
  const { anchorEl, isOpen, onClick, onClose } = useMenu();

  return (
    <Fragment>
      <Tooltip title={tooltipTitle} arrow>
        <IconButton
          onClick={onClick}
          sx={{ '&:focus': { outline: 'none' }, ...iconSx }}
        >
          {MenuIcon}
        </IconButton>
      </Tooltip>

      <Menu
        disableScrollLock
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                ...arrowPosition,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        {...props}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={onClose}
        onClick={onClose}
      >
        {children}
      </Menu>
    </Fragment>
  );
}
