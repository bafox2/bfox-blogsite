import { useState } from 'react'
import axios from 'axios'
import { Editor } from '@tinymce/tinymce-react'
import { useNavigate } from 'react-router-dom'

const PostForm = (props) => {
  const [formData, setFormData] = useState({
    title: props.post?.title || '',
    content: props.post?.content || '',
    user: props.user?.id || '',
    comments: props.post?.comments || [],
    published: props.post?.published || false,
    imgUrl: props.post?.imgUrl || '',
  })

  const navigate = useNavigate()

  let headers = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (props.post) {
      axios
        .put(`/posts/${props.post._id}/edit`, formData, headers)
        .then((res) => {
          props.setPosts((prevState) =>
            prevState.map((post) =>
              post._id === res.data._id ? res.data : post
            )
          )
          navigate(`/posts/${res.data._id}`)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      axios
        .post('/posts/create', formData, headers)
        .then((res) => {
          props.setPosts((prevState) => [...prevState, res.data])
          navigate(`/posts/${res.data._id}`)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const parseEditorData = (content, editor) => {
    const { targetElm } = editor
    const { name } = targetElm

    return {
      target: {
        name,
        value: content,
      },
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const clearForm = (e) => {
    e.preventDefault()
    setFormData({
      title: '',
      content: '',
      user: '',
      comments: [],
      published: false,
      imgUrl: '',
    })
  }

  const htmlDecode = (input) => {
    var doc = new DOMParser().parseFromString(input, 'text/html')
    return doc.documentElement.textContent
  }

  return (
    <main>
      {props.post.user.username === props.user.username ? (
        <form onSubmit={handleSubmit}>
          {/* title section */}
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            onChange={handleChange}
            value={formData.title}
            required={true}
          />
          {/* imgUrl section */}
          <label htmlFor="imgUrl">Image URL</label>
          <input
            type="text"
            name="imgUrl"
            className="form-control"
            onChange={handleChange}
            value={formData.imgUrl}
            required={true}
          />
          {/* content section */}
          <label htmlFor="content">Content</label>
          <Editor
            apiKey={process.env.REACT_APP_EDITOR_KEY}
            init={{
              height: '300px',
              menubar: true,
              plugins: ['link', 'lists'],
              toolbar:
                'undo redo | blocks | bold italic underline | link | bullist numlist',
            }}
            value={htmlDecode(formData.content)}
            textareaName="content"
            onEditorChange={(content, editor) => {
              handleChange(parseEditorData(content, editor))
            }}
          ></Editor>
          <button type="submit" className="btn btn-primary">
            {props.editing ? 'Update' : 'Submit'}
          </button>
          <button type="button" className="btn btn-danger" onClick={clearForm}>
            Clear
          </button>
        </form>
      ) : (
        <h1>You are not authorized to edit this post</h1>
      )}
    </main>
  )
}

export default PostForm
