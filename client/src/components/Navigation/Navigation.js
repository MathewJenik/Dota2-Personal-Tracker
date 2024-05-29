import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import useAuth from '../../hooks/useAuth';
import { ROLES } from '../../config/roles';

const Navigation = () => {
  const { username, status } = useAuth();
  const [dashExpand, setDashExpand] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const dashExpandToggle = () => {
    setDashExpand(!dashExpand);
  };

  const dashExpandOn = () => {
    setDashExpand(true);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const base = process.env.REACT_APP_BASE_URL;
  console.log("ENVIRONMENT VARIABLE IS: ", base);

  return (
    <div className={`nav-bar ${dashExpand ? 'nav-bar-expanded' : ''}`}>
      <button className="burger-menu" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to={`/${base}`}>Dota 2 Personal Stat Tracker</Link>
        <Link to={`/${base}/heroes`}>Heroes</Link>
        <Link to={`/${base}/items`}>Items</Link>
        {username && (
          <div className='nav-expandable' onMouseEnter={dashExpandToggle} onMouseLeave={dashExpandToggle}>
            <Link to={'dashboard'}>Player-Dashboard</Link>
          </div>
        )}
        {status == ROLES.Admin && (
          <Link to={'admin'}>Admin</Link>
        )}
        {!username && (
          <>
            <Link to={'login'}>Login</Link>
            <Link to={'register'}>Sign Up</Link>
          </>
        )}
        {username && (
          <Link to={'profile'}>{username}</Link>
        )}
        {dashExpand && (
          <div onMouseLeave={dashExpandToggle} onMouseEnter={dashExpandOn} className='secondary-nav'>
            <Link to={'dashboard/hero'}>Hero</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
