import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import '../style/Resetpassword.css'

const ResetPassword = () => {
  const [loading, setLoading] = useState(true)
  const [invalid, setInvalid] = useState(true)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const history = useHistory()

  useEffect(() => {
    let url = window.location.pathname
    url = url.substring(16, url.length)
    axios
      .get(`${process.env.REACT_APP_URL_BE}/api/v1/reset-password/${url}`)
      .then((res) => {
        setLoading(false)
        setInvalid(false)
        console.log(res)
        setId(res.data._id)
        console.log(id)
      })
      .catch((err) => {
        alert('Invalid reset password link...')
        setInvalid(false)
      })

    return () => {}
  }, [id])

  const btnAction = (e) => {
    e.preventDefault()
    history.push('/')
  }

  const changepass = async (e) => {
    e.preventDefault()
    setLoading(true)
    let url = window.location.pathname
    url = url.substring(16, url.length)

    if (password !== password2) {
      alert('Password mismatch!')
      setPassword('')
      setPassword2('')
      return
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_URL_BE}/api/v1/reset-password/${url}`,
        {
          password,
        }
      )

      alert('Password changed! Redirect to dashboard...')
      history.push('/')
    } catch (error) {
      alert(error.data.message)
      history.push('/')
    }
  }

  return (
    <div className='resetpass'>
      <h2>Reset Password</h2>
      {loading ? (
        <>
          {invalid ? (
            <p>Please wait...</p>
          ) : (
            <div className='forminvalid'>
              <p>Your reset password link is invalid...</p>
              <button className='btn btn-secondary' onClick={btnAction}>
                Back to home
              </button>
            </div>
          )}
        </>
      ) : (
        <div>
          <form>
            <p>Password</p>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
            ></input>
            <p>Confirm Password</p>
            <input
              type='password'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder='Confirm password'
            ></input>
            <br />
            <button className='btn btn-primary' onClick={changepass}>
              Change password
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default ResetPassword
