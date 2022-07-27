import axios from 'axios'
import { useState, useEffect } from 'react'

const Comment = (props) => {
  const [newComment, setNewComment] = useState(props.comment.comment)
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
        {
          user: props.user.username,
          comment: newComment,
          post: props.comment.post,
          comment_id: props.comment._id,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        }
      )
      .then((res) => {
        console.log(res, 'res')
        props.setComments(
          props.comments.map((comment) =>
            comment._id !== props.comment._id ? comment : res.data
          )
        )
        console.log(res.data, 'res.data')
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
      <h3 className="commentUser">{props.comment.user}</h3>
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
        <p>{props.comment.comment}</p>
      )}
      <button
        hidden={
          props.user && props.user.username === props.comment.user
            ? false
            : true
        }
        onClick={deleteComment}
      >
        Delete
      </button>
      <button
        hidden={
          props.user && props.user.username === props.comment.user
            ? false
            : true
        }
        onClick={handleEdit}
      >
        Edit
      </button>
    </div>
  )
}

export default Comment
