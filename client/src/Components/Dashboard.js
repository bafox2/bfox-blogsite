import PostPreview from './PostPreview'

const Dashboard = (props) => {
  return (
    <main className="main">
      <div className="dashboard">
        <h1>Your Posts</h1>
        <div className="preview-container">
          <div className="preview-published">
            <h3>Published Post</h3>
            <div>
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
          </div>
          <div className="preview-unpublished">
            <h3>Unpublished Post</h3>
            <div>
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
      </div>
    </main>
  )
}

export default Dashboard
