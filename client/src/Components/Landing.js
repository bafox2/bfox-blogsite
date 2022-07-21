import axios from 'axios'
import { useEffect, useState } from 'react'
import Post from './Post'

//i don't know how to make fetchPosts trigger in the component
const Landing = (props) => {
  const [published, setPublished] = useState([])

  useEffect(() => {
    setPublished(() => props.posts.filter((post) => post.published))
  }, [props])

  return (
    <div>
      {published.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Landing
