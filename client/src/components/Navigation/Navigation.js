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

    function dashExpandOn() {
      setDashExpand(true);
    }

  return (
    <div className={`nav-bar ${dashExpand ? 'nav-bar-expanded' : ''}`}>
        <Link to={'/'}>Dota 2 Personal Stat Tracker</Link>
        <Link to={'/heroes'}>Heroes</Link>
        <Link to={'/items'}>Items</Link>
        <div className='nav-expandable' onMouseEnter={dashExpandToggle} onMouseLeave={dashExpandToggle}>
        <Link to={'/dashboard'}>
            Player-Dashboard
            
        </Link>

        
        </div>

        {status==ROLES.Admin && (
            <Link to={'admin'}>Admin</Link>
        )}
        
        {/* check to see if logged in, if not show login*/}
        {!username && (
          <Link to={'login'}>Login</Link>

          )
        }

        {/* check to see if logged in, show username and link*/}
        {username && (
          <Link to={'profile'}>{username}</Link>

          )
        }

        {/* Expanding options*/}
        {dashExpand && (
            <div onMouseLeave={dashExpandToggle} onMouseEnter={dashExpandOn} className='secondary-nav'>
                <Link to={'dashboard/hero'}>Hero</Link>
            </div>
          )}


    </div>
  )
}

export default Navigation