import './App.css'
import { useEffect, useState } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Landing from './Components/Landing'
import SignupForm from './Components/SignupForm'
import LoginForm from './Components/LoginForm'
import { Routes, Route } from 'react-router-dom'
import Post from './Components/Post'
import axios from 'axios'
import Loader from './Components/Loader'
import PostForm from './Components/PostForm'
import Dashboard from './Components/Dashboard'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    axios.get('/posts').then((res) => {
      setPosts(res.data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="App">
      <Loader loading={loading} />
      <div hidden={loading ? true : false}>
        <Header user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Landing user={user} posts={posts} />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route
            path="/create"
            element={<PostForm user={user} posts={posts} setPosts={setPosts} />}
          />
          {posts.map((post) => (
            <Route
              path={`/posts/${post._id}`}
              key={post._id}
              element={<Post post={post} setPosts={setPosts} user={user} />}
            />
          ))}
          <Route
            path="/dashboard"
            element={<Dashboard user={user} posts={posts} />}
          />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
