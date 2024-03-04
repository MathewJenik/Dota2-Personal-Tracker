import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Navigation.css';
import useAuth from '../../hooks/useAuth';
import { ROLES } from '../../config/roles';

const Navigation = () => {

  const {username, status} = useAuth()



    const [dashExpand, setDashExpand] = useState(false);

    function dashExpandToggle() {
        setDashExpand(!dashExpand);
        
    }

  return (
    <div className='nav-bar'>
        <Link to={'/'}>Dota 2 Personal Stat Tracker</Link>
        <Link to={'/heroes'}>Heroes</Link>
        <Link to={'/items'}>Items</Link>
        <div className='nav-expandable' onMouseEnter={dashExpandToggle} onMouseLeave={dashExpandToggle}>
        <Link to={'/dashboard'}>
            Player-Dashboard
            {dashExpand && (
            <div onMouseLeave={dashExpandToggle} className='secondary-nav'>
                <Link to={'dashboard/hero'}>Hero</Link>
            </div>
            )}
        </Link>

        
        </div>

        {status==ROLES.Admin && (
            <Link to={'admin'}>Admin</Link>
        )}
        <Link to={'login'}>Login</Link>

    </div>
  )
}

export default Navigation