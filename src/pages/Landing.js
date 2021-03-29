import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Landing.css'

const Landing = () => {
  return (
    <div className='landing'>
      <h1>Simple Web Apps</h1>
      <div>
        <Link to='/login'>
          <button className='btn btn-primary'>Login</button>
        </Link>
        <Link to='/register'>
          <button className='btn btn-primary'>Register</button>
        </Link>
      </div>
    </div>
  )
}

export default Landing
