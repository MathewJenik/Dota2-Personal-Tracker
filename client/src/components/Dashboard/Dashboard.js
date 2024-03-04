import React from 'react'
import DashboardHeader from './DashboardHeader';
import { Outlet } from 'react-router-dom';

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