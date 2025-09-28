import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { userContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Cards/CharAvatar';

const Sidemenu = ({ activeMenu, closeSidebar }) => {
  const { user, clearUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleClick = (path) => {
    if (path === "/logout") {
      handleLogout();
      return;
    }closeSidebar?.(); // close sidebar if function is passed
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  return (
    <div className='p-4 w-64 min-h-screen shadow-md bg-white'>
      <div className='flex flex-col items-center mb-6'>
        {user?.profileimageurl ? (
          <img
            src={user.profileimageurl}
            alt='profile'
            className='w-20 h-20 rounded-full object-cover'
          />
        ):<CharAvatar fullName={user?.fullname} width="w-20" height="h-20" style="text-3xl" />}
        <h5 className='mt-2 text-lg font-semibold'>
          {user?.fullname || ''}
        </h5>
      </div>

      <div className='flex flex-col gap-2'>
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            onClick={() => handleClick(item.path)}
            className={`w-full flex items-center gap-4 px-4 py-2 rounded-lg text-sm text-left transition 
              ${activeMenu === item.label ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
          >
            <item.icon className='text-xl' />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidemenu;
