import { Link } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';

export default function NavLink({ to, children, className, ...props }) {
  const location = useLocation();
  const isActive = location.pathname === to.split('?')[0];

  return (
    <Link
      component={RouterLink}
      to={to}
      {...props}
      className={isActive ? `active ${className}` : className}
    >
      {children}
    </Link>
  );
}
