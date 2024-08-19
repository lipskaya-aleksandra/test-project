import { Link } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';

export default function NavLink({ to, children, sxFn, ...props }) {
  const location = useLocation();
  const isActive = location.pathname === to.split('?')[0];

  return (
    <Link component={RouterLink} to={to} {...props} sx={sxFn?.(isActive)}>
      {children}
    </Link>
  );
}
