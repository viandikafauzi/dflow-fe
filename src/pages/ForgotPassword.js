import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import '../style/Forgotpassword.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (email.length < 6) {
      alert('Please enter valid email')
      setLoading(false)
      return
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_URL_BE}/api/v1/forgot-password`,
        {
          email,
        }
      )

      setLoading(false)
      alert(
        'Reset success! If you enter valid email, you should receive email soon!'
      )
      history.push('/')
    } catch (error) {
      if (error.response) {
        // alert(error.response.data.message)
        alert(
          'Reset success! If you enter valid email, you should receive email soon!'
        )
        setLoading(false)
      }
    }
  }

  return (
    <div className='forgotpassword'>
      <h2>Forgot Password Form</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='base mt-3'>
            <p>Email</p>
            <input
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              required
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
              Reset Password
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
