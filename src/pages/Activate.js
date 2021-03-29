import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../style/Activate.css'
import { useHistory } from 'react-router'

const Activate = () => {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const history = useHistory()

  useEffect(() => {
    let url = window.location.pathname
    url = url.substring(8, url.length)
    axios
      .post(`${process.env.REACT_APP_URL_BE}/api/v1/activate/${url}`)
      .then((res) => {
        console.log(res)
        alert('Activation success!')
        setMessage(res.data.message)
        setLoading(false)
      })
      .catch((err) => {
        alert(err.response.data.message)
        setMessage(err.response.data.message)
        setLoading(false)
      })
  }, [])

  const btnAction = (e) => {
    e.preventDefault()
    history.push('/')
  }

  return (
    <div className='activate'>
      <h2>Account Activation</h2>
      {loading ? (
        <p>Please wait...</p>
      ) : (
        <div>
          <p>{message}</p>
          <button className='btn btn-secondary' onClick={btnAction}>
            Back to home
          </button>
        </div>
      )}
    </div>
  )
}

export default Activate
