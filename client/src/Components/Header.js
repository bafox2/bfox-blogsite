import { Link } from 'react-router-dom'

function Header(props) {
  const logout = (e) => {
    localStorage.removeItem('user')
  }
  return (
    <div className="header">
      header, welcome {props.user ? props.user.username : 'friend'}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/create" hidden={props.user ? false : true}>
          Create
        </Link>
        <Link to="/login" hidden={props.user ? true : false}>
          Login
        </Link>
        <Link to="/signup" hidden={props.user ? true : false}>
          Signup
        </Link>
        <Link hidden={props.user ? false : true} to="/dashboard">
          Dashboard
        </Link>
        <Link to="/" onClick={logout} hidden={props.user ? true : false}>
          Logout
        </Link>
      </nav>
    </div>
  )
}

export default Header
