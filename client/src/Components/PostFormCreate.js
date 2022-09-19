import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { modules, formats } from './EditorToolbar'
import { decode } from 'html-entities'

const PostFormCreate = (props) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: props.post?.title || '',
    content: props.post?.content || '',
    user: props.user?.id || '',
    comments: props.post?.comments || [],
    published: props.post?.published || false,
    imgUrl: props.post?.imgUrl || '',
  })

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
          // these lines definitely aren't working
          props.setPosts((prevState) =>
            prevState.map((post) => (props.id === post._id ? res.data : post))
          )
        })
        .catch((err) => {
          console.log(err)
        })
      navigate(`/posts/${props.post._id}`)
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

  const handleChange = (event) => {
    console.log(event.target)
    const { name, value, type, checked } = event.target
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: type === 'checkbox' ? checked : value,
      }
    })
  }

  const handleQuillEdit = (value) => {
    setFormData((prev) => {
      return {
        ...prev,
        content: value,
      }
    })
  }

  console.log(formData)
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="form__group">
            <input
              id="title"
              type="text"
              name="title"
              className="form__input"
              onChange={(e) => handleChange(e)}
              value={formData.title}
              required={true}
              placeholder=""
            />
            <label className="form__label" htmlFor="title">
              Title
            </label>
          </div>
          <div className="form__group">
            <input
              id="imgUrl"
              type="text"
              name="imgUrl"
              className="form__input"
              onChange={handleChange}
              value={formData.imgUrl}
              required={true}
              placeholder=""
            />
            <label className="form__label" htmlFor="imgUrl">
              Image URL
            </label>
          </div>

          <label htmlFor="content">Content</label>
          <ReactQuill
            theme="snow"
            // value={formData.content}
            defaultValue={decode(formData.content)}
            onChange={handleQuillEdit}
            modules={modules}
            formats={formats}
            className="quill-editor"
          />
          <div className="buttons">
            <label htmlFor="publish">Publish now?</label>
            <input
              id="publish"
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              value={formData.published}
            />
            <button type="submit" className="btn btn-primary">
              {'Submit'}
            </button>
          </div>
        </div>
      </form>
    </main>
  )
}

export default PostFormCreate
