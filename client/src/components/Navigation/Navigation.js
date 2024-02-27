import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Navigation.css';

const Navigation = () => {

    const [dashExpand, setDashExpand] = useState(false);

    function dashExpandToggle() {
        setDashExpand(!dashExpand);
        
    }

  return (
    <div className='nav-bar'>
        <Link to={'/'}>Dota 2 Personal Stat Tracker</Link>
        <Link to={'/guides'}>Guides</Link>
        <div className='nav-expandable' onMouseEnter={dashExpandToggle} onMouseLeave={dashExpandToggle}>
        <Link to={'/dashboard'}>
            Player-Dashboard
            {dashExpand && (
            <div onMouseLeave={dashExpandToggle} className='secondary-nav'>
                <Link to={'dashboard/hero'}>Heri</Link>
            </div>
            )}
        </Link>
        </div>

    </div>
  )
}

export default Navigation