import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import '../style/Profile.css'

const Profile = () => {
  const [profile, setProfile] = useState({ email: '', password: '' })

  const history = useHistory()

  const Checkjwt = async () => {
    try {
      await jwt.verify(
        localStorage.getItem('dflowkey').substring(1).slice(0, -1),
        process.env.REACT_APP_JWT_KEY
      )
      const config = {
        headers: {
          Authorization:
            'Bearer ' +
            localStorage.getItem('dflowkey').substring(1).slice(0, -1),
        },
      }

      const result = await axios.get(
        `${process.env.REACT_APP_URL_BE}/api/v1/profile`,
        config
      )
      setProfile({ email: result.data.email, password: result.data.password })
    } catch (error) {
      console.error(error)
      alert('invalid login token detected')
      handlelogout()
    }
  }

  const handlelogout = () => {
    localStorage.removeItem('dflowkey')
    history.push('/')
  }

  useEffect(() => {
    Checkjwt()
  })

  return (
    <div className='profile'>
      <h1>Profile</h1>
      <div>
        <label>email: </label>
        <span>{profile.email}</span>
        <br />
        <label>password hash: </label>
        <span>{profile.password}</span>
      </div>
      <div>
        <button className='btn btn-primary' onClick={() => history.push('/')}>
          Home
        </button>
        <button className='btn btn-secondary' onClick={handlelogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Profile
