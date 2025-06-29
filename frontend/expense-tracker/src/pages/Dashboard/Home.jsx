import React from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth';

function Home() {
  useUserAuth();
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'></div>
    </DashboardLayout>
  )
}

export default Home