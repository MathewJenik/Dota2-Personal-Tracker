import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <section className='home-container bg-dark-charcoal flex'>
      
      {
        // Hero Section
      }
      <div className='hero grid grid-cols-1 lg:grid-cols-2 m-10 w-full'>

        <h1 className='text-white text-4xl flex flex-row justify-center items-center'>Dota 2 Personal Stat Tracker</h1>
        
        <div className='home-form flex flex-col justify-center items-center'>
          <h2 className='text-dark-charcoal text-4xl m-4'> Sign Up For a Free Account.</h2>
          <input className='border m-8' placeholder='Email' type='text'></input>
          <input className='border' placeholder='Password' type='password'></input>
          <button className=''>Register</button>
        </div>

      </div>

      {
        // Website information
      }
      <div className="alternate-bg">
        
        <div className="split-container-right">
          <img src='/assets/images/general/DPST.webp'></img>
          <div className='split-info'>
            <h1>Recent Match Statistics</h1>

          </div>
        
        </div>
        
        <div className="split-container-left">
          <div className='split-info'>
            <h1>Post Match Analytics</h1>

          </div>
          <img src='/assets/images/general/DPST Match.webp'></img>
        
        </div>
        

      </div>
    </section>
  )
}

export default Home