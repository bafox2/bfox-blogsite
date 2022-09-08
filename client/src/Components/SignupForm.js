import axios from 'axios'
import { useState } from 'react'

const SignupForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('/users/signup', { username, password, confirmPassword })
      .then(() => props.history.push('users/signup'))
      .catch((err) => {
        if (err.status === 400) {
          setError('Passwords do not match')
          console.log(error)
        } else if (err.status === 409) {
          setError('Username already taken')
        } else {
          setError('Something went wrong')
        }
      })
  }

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
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </div>
      </form>
    </main>
  )
}

export default SignupForm
