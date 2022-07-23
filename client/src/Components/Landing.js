import axios from 'axios'
import { useEffect, useState } from 'react'
import PostPreview from './PostPreview'

//i don't know how to make fetchPosts trigger in the component
const Landing = (props) => {
  const [published, setPublished] = useState([])

  useEffect(() => {
    setPublished(() => props.posts.filter((post) => post.published))
  }, [props])

  return (
    <div>
      {published.map((post) => (
        <PostPreview
          key={post._id}
          post={post}
          publishEdit={false}
          setPosts={props.setPosts}
        />
      ))}
    </div>
  )
}

export default Landing
