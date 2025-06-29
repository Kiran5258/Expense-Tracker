import React, { useState } from 'react'
import {HiOutlineMenu,HiOutlineX} from 'react-icons/hi';
import Sidemenu from './Sidemenu';
const Navbar = ({activeMenu}) => {
  const [opensidemenu,setopensidemenu]=useState(false);
  return (
    <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] px-4 py-4 sticky top-0 z-30'>
      <button
      className='block lg:hidden text-black'
      onClick={()=>{
        setopensidemenu(!opensidemenu)
      }}
      >
        {opensidemenu ?(
          <HiOutlineX className='text-2xl'/>

        ):(
          <HiOutlineMenu className='text-2xl'/>
        )}
      </button>

      <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>

      {opensidemenu && (
        <div className='fixed top-[61px] -ml-4 bg-white'>
        <Sidemenu activeMenu={activeMenu}/>
        </div>
      )}
    </div>
  )
}

export default Navbar