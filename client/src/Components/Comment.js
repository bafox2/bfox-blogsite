import axios from 'axios'
import { useState } from 'react'

const Comment = (props) => {
  const [newComment, setNewComment] = useState(props.comment.content)
  const [editing, setEditing] = useState(false)

  const deleteComment = () => {
    axios
      .delete(`/comments/${props.comment._id}/delete`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`,
        },
      })
      .then(() => {
        props.setComments(
          props.comments.filter((comment) => comment._id !== props.comment._id)
        )
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const editComment = (e) => {
    e.preventDefault()
    axios
      .put(
        `/comments/${props.comment._id}/edit`,
        { username: props.user.username, content: newComment },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        }
      )
      .then((res) => {
        props.setComments(
          props.comments.map((comment) => {
            comment._id !== props.comment._id ? comment : res.data
          })
        )
        props.setCommentEdit(false)
        setEditing(false)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleEdit = () => {
    props.setCommentEdit(true)
    setEditing(true)
  }

  return (
    <div className="comment">
      <h1>{props.comment.username}</h1>
      {editing ? (
        <form onSubmit={editComment}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">Edit</button>
        </form>
      ) : (
        <p>{props.comment.content}</p>
      )}
      <button onClick={handleEdit}>Edit</button>
      <button onClick={deleteComment}>Delete</button>
    </div>
  )
}

export default Comment
