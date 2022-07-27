import { Link } from 'react-router-dom'
import styles from '../index.scss'
import { useNavigate } from 'react-router-dom'

function Header(props) {
  const navigate = useNavigate()
  const logout = (e) => {
    localStorage.removeItem('user')
    props.setUser(null)
    navigate('/')
  }
  return (
    <header>
      <div>header, welcome {props.user ? props.user.username : 'friend'}</div>
      <nav>
        <Link className="nav-item" to="/">
          Home
        </Link>
        <Link
          className="nav-item"
          to="/create"
          hidden={props.user ? false : true}
        >
          Create
        </Link>
        <Link
          className="nav-item"
          to="/login"
          hidden={props.user ? true : false}
        >
          Login
        </Link>
        <Link
          className="nav-item"
          to="/signup"
          hidden={props.user ? true : false}
        >
          Signup
        </Link>
        <Link
          className="nav-item"
          hidden={props.user ? false : true}
          to="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className="nav-item"
          to="/"
          onClick={logout}
          hidden={props.user ? false : true}
        >
          Logout
        </Link>
      </nav>
    </header>
  )
}

export default Header
