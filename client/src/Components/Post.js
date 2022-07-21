import { useState, useEffect } from 'react'
import axios from 'axios'

const Post = (props) => {
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState()

  const handleLike = function () {
    if (liked) {
      axios
        .put(
          `/posts/${props.post._id}/unlike`,
          { user_id: props.post.user._id },
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('user')).token
              }`,
            },
          }
        )
        .then((res) => {
          setLikes(res.data)
          setLiked(false)
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      axios
        .put(
          `/posts/${props.post._id}/like`,
          { user_id: props.post.user._id },
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('user')).token
              }`,
            },
          }
        )
        .then((res) => {
          setLikes(res.data)
          setLiked(true)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  useEffect(() => {
    axios.get(`/posts/${props.post._id}/likes`).then((res) => {
      setLikes(res.data)
      if (res.data.some((id) => id === props.user?._id)) setLiked(true)
    })
  }, [props.likes, props._id, props.user])

  return (
    <div className="post">
      <h1>{props.post.title}</h1>
      <p>{props.post.content}</p>
      <p>{props.post.user.username}</p>
      <p>{props.post.likes}</p>
      <p>{props.post.createdAt}</p>
      <p>{props.post._id}</p>

      <button
        className="like"
        onClick={handleLike}
        hidden={props.user ? false : true}
      >
        {liked ? 'Unlike' : 'Like'}
      </button>
    </div>
  )
}

export default Post
