import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <section className='bg-dark-charcoal flex'>
      
      <div className='hero grid grid-cols-1 lg:grid-cols-2 m-10 w-full'>

        <h1 className='text-white text-4xl flex flex-row justify-center items-center'>Dota 2 Personal Stat Tracker</h1>
        
        <div className='home-form flex flex-col justify-center items-center'>
          <h2 className='text-dark-charcoal text-4xl m-4'> Sign Up For a Free Account.</h2>
          <input className='border m-8' placeholder='Email' type='text'></input>
          <input className='border' placeholder='Password' type='password'></input>
          <button className=''>Register</button>
        </div>

      </div>
    </section>
  )
}

export default Home