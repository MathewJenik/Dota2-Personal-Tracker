import React from 'react'
import { Outlet } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';

const Dashboard = () => {
  return (
    <>
        <DashboardHeader />
        <div className='dashboard-container'>
            <Outlet />
        </div>
    </>
  )
}
export default Dashboard;