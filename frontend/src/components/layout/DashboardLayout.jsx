import React, { useContext } from 'react';
import Navbar from './Navbar';
import { userContext } from '../../context/UserContext';
import Sidemenu from './Sidemenu';

export default function DashboardLayout({ children, activeMenu }) {
  const { user } = useContext(userContext);

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex min-h-screen">
          <div className="hidden lg:flex flex-col w-64 bg-white shadow-lg h-screen sticky top-0">
            <Sidemenu activeMenu={activeMenu} />
          </div>

          {/* Main content */}
          <div className="flex-1 p-5">
            {children}</div>
        </div>
      )}
    </div>
  );
}
