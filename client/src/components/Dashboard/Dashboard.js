import React from 'react'
import DashboardHeader from './DashboardHeader';
import { Outlet } from 'react-router-dom';
import RecentMatches from '../RecentMatches/RecentMatches';
import PlayerStatistics from '../PlayerStatistics/PlayerStatistics';

const Dashboard = () => {

  return (
    <>
        <DashboardHeader />
        <div className='dashboard-container'>
            <Outlet />
            <h1 className='primary-heading'>Player Dashboard</h1>
            <PlayerStatistics />
            <RecentMatches/>
        </div>
    </>
  )
}
export default Dashboard;