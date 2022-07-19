import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    let headersList = {
      Accept: '*/*',
    }

    fetch('/posts', {
      method: 'GET',
      headers: headersList,
    }).then((res) => {
      setPosts(res)
    })
  }, [])
  return <div className="App">{posts} hello</div>
}

export default App
