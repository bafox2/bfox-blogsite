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
          <h1>Sign-up</h1>
          {/* username section */}
          <div className="form__group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="form__control"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {/* password section */}
          <div className="form__group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="form__control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* confirm password section */}
          <div className="form__group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form__control"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {/* buttons */}
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
