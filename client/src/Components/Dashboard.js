import PostPreview from './PostPreview'

const Dashboard = (props) => {
  return (
    <main className="main">
      <div className="dashboard">
        <h1>Posts by {props.user.username}</h1>
        <div className="preview-container">
          <div className="preview-published">
            <h3>Published Post</h3>
            {props.posts
              .filter(
                (post) =>
                  post.user._id === props.user.id && post.published === true
              )
              .map((post) => (
                <PostPreview
                  key={post._id}
                  post={post}
                  setPosts={props.setPosts}
                  publishAccess={true}
                />
              ))}
          </div>
          <div className="preview-unpublished">
            <h3>Unpublished Post</h3>
            {props.posts
              .filter(
                (post) =>
                  post.user._id === props.user.id && post.published === false
              )
              .map((post) => (
                <PostPreview
                  key={post._id}
                  post={post}
                  setPosts={props.setPosts}
                  publishAccess={true}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
