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
import PostFormCreate from './Components/PostFormCreate.js'

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
      <div hidden={loading ? true : false} className="container">
        <Header className="header" user={user} setUser={setUser} />
        <Routes>
          <Route
            path="/"
            element={
              <Landing
                user={user}
                key={posts._id}
                posts={posts}
                setPosts={setPosts}
              />
            }
          />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route
            path="/create"
            element={<PostFormCreate user={user} setPosts={setPosts} />}
          />
          {posts.map((post) => (
            <Route
              path={`/posts/${post._id}`}
              key={post._id}
              element={
                <Post
                  key={post._id}
                  post={post}
                  setPosts={setPosts}
                  user={user}
                />
              }
            />
          ))}

          {posts.map((post) => (
            <Route
              path={`/posts/${post._id}/edit`}
              key={post._id}
              element={
                <PostForm
                  user={user}
                  post={post}
                  setPosts={setPosts}
                  id={post._id}
                  editing={true}
                />
              }
            />
          ))}
          <Route
            path="/dashboard"
            element={
              <Dashboard user={user} posts={posts} setPosts={setPosts} />
            }
          />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
