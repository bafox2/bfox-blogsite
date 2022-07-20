//make a quick post component
// Language: javascript
// Path: client/src/Components/Post.js

const Post = ({ post }) => {
  return (
    <div className="post">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}

export default Post
