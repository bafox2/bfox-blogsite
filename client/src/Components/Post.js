import { useState, useEffect } from 'react'
import axios from 'axios'
import Comment from './Comment'
import CommentForm from './CommentForm'
import PostForm from './PostForm'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'

const Post = (props) => {
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  //this needs to have the default value updated
  const [liked, setLiked] = useState()
  const [commentEdit, setCommentEdit] = useState(false)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    axios.get(`/posts/${props.post._id}/likes`).then((res) => {
      setLikes(res.data)
      if (res.data.some((id) => id === props.user?.id)) setLiked(true)
    })
  }, [liked])

  const options = {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.class === 'remove') {
        return <></>
      }
    },
  }

  useEffect(() => {
    axios
      .get(`/comments/${props.post._id}/`)
      .then((res) => {
        setComments(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [commentEdit])

  const handleEdit = () => {
    setEditing(true)
  }

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

  // const handleDangerousHTML = DOMPurify.sanitize(props.post.content, {
  //   ALLOWED_TAGS: [
  //     'span',
  //     'p',
  //     'a',
  //     'em',
  //     'i',
  //     'u',
  //     's',
  //     'strong',
  //     'sup',
  //     'sub',
  //     'code',
  //     'pre',
  //     'blockquote',
  //     'h1',
  //     'h2',
  //     'h3',
  //     'h4',
  //     'h5',
  //     'h6',
  //   ],
  //   ALLOWED_ATTR: ['href', 'class', 'style'],
  // })

  return (
    <main className="post">
      <h1 className="title">{props.post.title}</h1>
      <h2 className="author">By: {props.post.user.username}</h2>
      <p
        dangerouslySetInnerHTML={{ __html: parse(props.post.content, options) }}
      />
      <p>Likes: {likes.length}</p>
      <p>{props.post.createdAt}</p>
      <p>{props.post._id}</p>
      <Link to={`/posts/${props.post._id}/edit`}>
        <button
          onClick={handleEdit}
          hidden={props.user?.id === props.post.user._id ? false : true}
        >
          Edit link
        </button>
      </Link>

      <button
        className="like"
        onClick={handleLike}
        hidden={props.user ? false : true}
      >
        {liked ? 'Unlike' : 'Like'}
      </button>
      <div className="comments">
        {comments.length ? 'Comments:' : 'No comments yet'}
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            user={props.user}
            setComments={setComments}
            setCommentEdit={setCommentEdit}
            comments={comments}
          />
        ))}
        {!props.user && <p>Please log in to comment</p>}
        {props.user && (
          <CommentForm
            post={props.post}
            setComments={setComments}
            comments={comments}
          />
        )}
      </div>
      {editing && (
        <PostForm
          post={props.post}
          user={props.user}
          setEditing={setEditing}
          setPosts={props.setPosts}
          id={props.post._id}
          editing={editing}
          comments={comments}
          hidden={props.user ? false : true}
        />
      )}
    </main>
  )
}

export default Post
