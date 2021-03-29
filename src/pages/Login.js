import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../style/Login.css'
import validator from 'email-validator'
import { Link, useHistory } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!validator.validate(email)) {
      alert('Please input valid email')
      setLoading(false)
      return
    }
    if (password.length < 8) {
      alert('Password must have 8 characters or more')
      setLoading(false)
      return
    }

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_URL_BE}/api/v1/login`,
        {
          email,
          password,
        }
      )

      localStorage.setItem('dflowkey', JSON.stringify(result.data.JWTtoken))

      setLoading(false)
      alert('Login successful! Redirect to dashboard...')
      history.push('/')
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    const x = JSON.parse(localStorage.getItem('dflowkey'))
    if (x !== null) {
      history.push('/profile')
    } else {
      // do nothing
    }
  }, [history])

  return (
    <div className='login'>
      <h2>Login</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='base mt-3'>
            <p>Email</p>
            <input
              type='email'
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className='base'>
            <p>Password</p>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          {loading ? (
            <button className='btn btn-primary container mt-3' disabled>
              Loading....
            </button>
          ) : (
            <button
              className='btn btn-primary container mt-3'
              onClick={handleSubmit}
            >
              Login
            </button>
          )}
        </form>
      </div>
      <p className='forgot'>
        Forgot password? <Link to='/forgot-password'>Click here</Link>
      </p>
    </div>
  )
}

export default Login
