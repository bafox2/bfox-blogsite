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
        <div className="form">
          <h1 className="form__title">Login</h1>

          <div className="form__group">
            <input
              className="form__input"
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              required
              placeholder=""
            />
            <label className="form__label" htmlFor="username">
              Username
            </label>
          </div>
          <div className="form__group">
            <input
              placeholder=""
              type="password"
              name="password"
              className="form__input"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="form__label" htmlFor="password">
              Password
            </label>
          </div>
          {/* buttons */}
          <button type="submit" className="form__button">
            Login
          </button>
          <p className="form__description">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
          <p className="form__warning">{error}</p>
        </div>
      </form>
    </main>
  )
}

export default LoginForm
