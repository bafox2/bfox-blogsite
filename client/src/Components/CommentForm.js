import { useEffect, useState } from 'react'
import axios from 'axios'

const CommentForm = (props) => {
  const [comment, setComment] = useState('')
  const [username, setUsername] = useState()

  const submitHandler = (e) => {
    e.preventDefault()

    axios
      .post(
        `/comments/${props.post._id}/`,
        {
          user: JSON.parse(localStorage.getItem('user')).user.username,
          comment: comment,
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
        props.setComments([...props.comments, res.data])
        setComment('')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    if (props.user) setUsername(props.user.username)
  }, [props])

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="user" hidden={props.user ? true : false}>
        Posting as: {JSON.parse(localStorage.getItem('user')).user.username}
      </label>

      <div className="textarea">
        <textarea
          name="comment"
          className="form-control"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          rows="3"
          required
        ></textarea>
      </div>

      <button disabled={comment ? false : true}>Comment</button>
    </form>
  )
}

export default CommentForm
