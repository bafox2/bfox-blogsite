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
        <Link to="/create">Create</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/" onClick={logout}>
          Logout
        </Link>
      </nav>
    </div>
  )
}

export default Header
