import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Post from './Components/Post'
function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    let headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    }

    fetch('/posts', {
      method: 'GET',
      headers: headersList,
    }).then((res) => {
      console.log(res)
      setPosts(res.data)
    })
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        {posts.map((post) => (
          <Route
            key={post._id}
            path={`/posts/${post._id}`}
            render={() => <Post />}
          ></Route>
        ))}
      </Routes>
      <Footer />
    </div>
  )
}

export default App
