import { useEffect, useState } from 'react'
import axios from 'axios'

const Dashboard = (props) => {
  const [showPublished, setShowPublished] = useState(false)
  const [showUnpublished, setShowUnpublished] = useState(false)

  const deletePost = (id) => {
    console.log(id)
    axios
      .delete(`/posts/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`,
        },
      })
      .then((res) => {
        props.setPosts((prevState) =>
          prevState.filter((post) => post._id !== id)
        )
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    props.posts.filter(
      (post) => post.user._id === props.user._id && post.published === true
    ).length
      ? setShowPublished(true)
      : setShowPublished(false)

    props.posts.filter(
      (post) => post.user._id === props.user._id && post.published === false
    ).length
      ? setShowUnpublished(true)
      : setShowUnpublished(false)
  }, [props.posts])
  props.posts.map((post) => console.log(post.user._id, props.user.id))
  console.log(props.user)

  return (
    <div className="dashboard">
      <h3>Published Post</h3>

      <div>
        {props.posts
          .filter(
            (post) => post.user._id === props.user.id && post.published === true
          )
          .map((post) => (
            <div key={post._id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
              <button onClick={() => deletePost(post._id)}>Delete</button>
            </div>
          ))}
      </div>

      <h3>Unpublished Post</h3>
      <div>
        {props.posts
          .filter(
            (post) =>
              post.user._id === props.user.id && post.published === false
          )
          .map((post) => (
            <div key={post._id}>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
              <button onClick={() => deletePost(post._id)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Dashboard
