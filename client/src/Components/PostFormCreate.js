import { useEffect, useState } from 'react'
import axios from 'axios'
import { Editor } from '@tinymce/tinymce-react'
import { useNavigate } from 'react-router-dom'
import QuillEditor from './QuillEditor'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { modules, formats } from './EditorToolbar'

const PostFormCreate = (props) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    user: '',
    comments: [],
    published: false,
    imgUrl: '',
  })

  let headers = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  }

  const handleSubmit = (e) => {
    e.preventDefault()
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
    console.log(formData)
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

  const handleQuillEdit = (value) => {
    setFormData((prev) => {
      return {
        ...prev,
        content: value,
      }
    })
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={handleQuillEdit}
          modules={modules}
          formats={formats}
        />
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
        {/* <Editor
          apiKey={process.env.REACT_APP_EDITOR_KEY}
          init={{
            height: '300px',
            menubar: true,
            plugins: ['link', 'lists'],
            toolbar:
              'undo redo | blocks | bold italic underline | link | bullist numlist',
          }}
          value={formData.content}
          textareaName="content"
          onEditorChange={(content, editor) => {
            handleChange(parseEditorData(content, editor))
          }}
        ></Editor> */}
        <button type="submit" className="btn btn-primary">
          {'Submit'}
        </button>
        <button type="button" className="btn btn-danger" onClick={clearForm}>
          Clear
        </button>
      </form>
    </main>
  )
}

export default PostFormCreate
