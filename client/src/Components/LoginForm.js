import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('/users/login', { username, password })
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data))
        props.setUser(res.data.user)
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status === 400) {
          setError(err.response.data.message)
        } else {
          console.log(err)
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
        {/* buttons */}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
      <p>{error}</p>
    </main>
  )
}

export default LoginForm
