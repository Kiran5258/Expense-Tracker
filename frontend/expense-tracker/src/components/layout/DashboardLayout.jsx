import React, { useContext } from 'react';
import Navbar from './Navbar';
import { userContext } from '../../context/UserContext';
import Sidemenu from './Sidemenu';

export default function DashboardLayout({children,activeMenu}) {
    const {user}=useContext(userContext);
    return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className='flex'>
           <div className='max-[1080px]:hidden'>
            <Sidemenu activeMenu={activeMenu} />
          </div>
          <div className='grow mx-5'>
          {children}
          </div>
        </div>
      )}
    </div>
  );
}
