import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../index.scss'
import { decode } from 'html-entities'

//the axios thing is working, we just need to make sure that the ui is changed
const PostPreview = (props) => {
  const handlePublish = (post) => {
    let publishAction = post.published ? 'unpublish' : 'publish'

    let headers = {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    }

    //i am unsure if the post is being unpublished because the backend is doing it?
    axios
      .put(`/posts/${post._id}/${publishAction}`, {}, { headers })
      .then((res) => {
        props.setPosts((prevState) =>
          prevState.map((post) => {
            if (post._id === res.data._id) {
              return res.data
            } else {
              return post
            }
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

  //useEffect for publishing that will update the page after the backend is updated

  return (
    <div className="preview">
      <Link className="previewCard" to={`/posts/${props.post._id}`}>
        <h2 className="title">{props.post.title}</h2>
        <h3 className="author"> {props.post.user.username}</h3>
        <p className="posted">{props.post.createdAt.slice(0, 10)}</p>
        <p className="content">
          {props.post.content.slice(0, 140).replace(/<[^>]+>/gi, ' ')}
          ...
        </p>
        <img
          className="imgPreview"
          src={decode(props.post.imgUrl)}
          alt="Image preview"
        ></img>
      </Link>
      {props.publishAccess && (
        <div className="buttons">
          <button onClick={() => handlePublish(props.post)}>
            {props.post.published ? 'Unpublish' : 'Publish'}
          </button>

          <Link className="nav-item" to={`/posts/${props.post._id}/edit`}>
            <button>Edit link</button>
          </Link>

          <button
            onClick={deletePost}
            hidden={props.publishAccess ? false : true}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default PostPreview
