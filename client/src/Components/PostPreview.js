import { Link } from 'react-router-dom'
import axios from 'axios'
import '../index.scss'

const PostPreview = (props) => {
  const handlePublish = () => {
    let publishAction = props.published ? 'unpublish' : 'publish'

    let headers = {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    }

    axios
      .put(`/posts/${props.post._id}/${publishAction}`, {}, { headers })
      .then((res) => {
        props.setPosts((prevState) =>
          prevState.map((post) => {
            if (post._id === props.post._id) {
              //will need to make sure that backed connects here
              post.published = !post.published
            }
            return post
          })
        )
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const deletePost = () => {
    axios
      .delete(`/posts/${props.post._id}/delete`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`,
        },
      })
      .then((res) => {
        props.setPosts((prevState) =>
          prevState.filter((post) => post._id !== props.post._id)
        )
      })
      .catch((err) => {
        console.error(err)
      })
  }
  return (
    <div className="preview">
      <Link to={`/posts/${props.post._id}`}>
        <h2 className="title">{props.post.title}</h2>
        <h3 className="author"> By {props.post.user.username}</h3>
        <p className="posted">Posted: {props.post.createdAt.slice(0, 10)}</p>
        <p className="likes">Likes: {props.post.likes.length}</p>
        <p className="comments">Comments: {props.post.comments.length}</p>
        <img src={props.post.imgURL}></img>
      </Link>
      <p>{props.post.body}</p>
      {/* will need to make this conditional for dashboard */}
      <button
        onClick={handlePublish}
        hidden={props.publishAccess ? false : true}
      >
        {props.post.published ? 'Unpublish' : 'Publish'}
      </button>

      <Link className="nav-item" to={`/posts/${props.post._id}/edit`}>
        <button hidden={props.publishAccess ? false : true}>Edit link</button>
      </Link>
      <button onClick={deletePost} hidden={props.publishAccess ? false : true}>
        Delete
      </button>
    </div>
  )
}

export default PostPreview
