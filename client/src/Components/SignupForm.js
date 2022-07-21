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
        {/* username section */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          className="form-control"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {/* password section */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* confirm password section */}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="form-control"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {/* buttons */}
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </main>
  )
}

export default SignupForm
