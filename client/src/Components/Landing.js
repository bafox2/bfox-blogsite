import { useEffect, useState } from 'react'
import PostPreview from './PostPreview'

//i don't know how to make fetchPosts trigger in the component
const Landing = (props) => {
  const [published, setPublished] = useState([])

  useEffect(() => {
    setPublished(() => props.posts.filter((post) => post.published))
  }, [props.posts])
  console.log(props)
  return (
    <main>
      <h1>Posts</h1>
      <p>
        This is a space for people who are learning how to code to share the
        things they learned about and think are cool. If you have something to
        add, you can post a comment. I made this site because when you are able
        to teach something, you probably learned it well. Thanks!
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
