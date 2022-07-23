import { useEffect, useState } from 'react'
import axios from 'axios'
import PostPreview from './PostPreview'

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

  return (
    <div className="dashboard">
      <h3>Published Post</h3>

      <div>
        {props.posts
          .filter(
            (post) => post.user._id === props.user.id && post.published === true
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
  )
}

export default Dashboard
