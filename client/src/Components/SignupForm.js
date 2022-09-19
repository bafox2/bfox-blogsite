import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignupForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('/users/signup', { username, password, confirmPassword })
      .then((res) => {
        navigate('/login')
      })

      .catch((err) => {
        console.log(err)
        if (err.response.status === 401) {
          console.log(err.response.data.message)
          setMessage(err.response.data.message)
        }
        if (err.response.status === 409) {
          console.log(err.response.data.message)
          setMessage(err.response.data.message)
        } else {
          console.log(err)
        }
      })
  }
  console.log(message)
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <h1 className="form__title">Sign-up</h1>
          <div className="form__group">
            <input
              className="form__input"
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              placeholder=""
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username" className="form__label">
              Username
            </label>
          </div>
          <div className="form__group">
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              placeholder=""
              className="form__input"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password" className="form__label">
              Password
            </label>
          </div>
          <div className="form__group">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="off"
              placeholder=""
              className="form__input"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label className="form__label" htmlFor="confirmPassword">
              Confirm Password
            </label>
          </div>
          <p className="form__warning">{message}</p>
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </div>
      </form>
    </main>
  )
}

export default SignupForm
