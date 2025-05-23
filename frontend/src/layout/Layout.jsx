import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  };

  return (
    <Sidebar onLogout={handleLogout}>
      <Outlet />
    </Sidebar>
  );
};

export default Layout;
