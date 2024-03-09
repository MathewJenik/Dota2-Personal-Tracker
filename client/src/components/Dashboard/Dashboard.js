import React from 'react'
import DashboardHeader from './DashboardHeader';
import { Outlet } from 'react-router-dom';
import RecentMatches from '../RecentMatches/RecentMatches';

const Dashboard = () => {

  const name = "test name";

  return (
    <>
        <DashboardHeader />
        <div className='dashboard-container'>
            <Outlet />
            <h1>{name}</h1>

            <RecentMatches dota_id={1}/>
        </div>
    </>
  )
}
export default Dashboard;