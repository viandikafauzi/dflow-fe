import React, { useState } from 'react'
import axios from 'axios'
import validator from 'email-validator'
import { useHistory } from 'react-router'
import '../style/Register.css'

const Register = () => {
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
      await axios.post(`${process.env.REACT_APP_URL_BE}/api/v1/register`, {
        email,
        password,
      })

      setLoading(false)
      alert('Register successful! Check email for account activation!')
      history.push('/')
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
        setLoading(false)
      }
    }
  }

  return (
    <div className='register'>
      <h2>Register</h2>
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
              Register
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default Register
