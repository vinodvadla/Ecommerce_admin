import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <Stack justifyContent="center" alignItems="center" minHeight="100vh">
      <Outlet />
    </Stack>
  );
};

export default AuthLayout;
