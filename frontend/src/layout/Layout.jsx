import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
