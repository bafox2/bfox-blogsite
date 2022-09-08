import { useEffect, useState } from 'react'
import PostPreview from './PostPreview'

//i don't know how to make fetchPosts trigger in the component
const Landing = (props) => {
  const [published, setPublished] = useState([])

  useEffect(() => {
    setPublished(() => props.posts.filter((post) => post.published))
  }, [props.posts])

  return (
    <main>
      <h1>Posts</h1>
      <p>
        This is a space for people who are learning how to code to share the
        things they wish they knew about when they first started. Some post
        ideas could be resources they found enlighting,
      </p>
      <div className="preview-container">
        {published.map((post) => (
          <PostPreview
            key={post._id}
            post={post}
            publishEdit={false}
            setPosts={props.setPosts}
          />
        ))}
      </div>
    </main>
  )
}

export default Landing
