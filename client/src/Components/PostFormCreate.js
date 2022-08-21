import { useRef, useState } from 'react'
import axios from 'axios'
import { Editor } from '@tinymce/tinymce-react'
import { useNavigate } from 'react-router-dom'
import QuillEditor from './QuillEditor'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { modules, formats } from './EditorToolbar'
import htmlEntities, { decode } from 'html-entities'

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
          console.log(formData)
          props.setPosts((prevState) =>
            prevState.map((post) => (props.id === post._id ? res.data : post))
          )

          console.log(formData)
          console.log(res.data)
          console.log(decode(res.data.content))
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    console.log(e.target)
  }

  const clearForm = (e) => {
    e.preventDefault()
    setFormData((prevState) => ({
      ...prevState,
      title: '',
      content: '',
      imgUrl: '',
    }))
  }

  const handleQuillEdit = (value) => {
    setFormData((prev) => {
      return {
        ...prev,
        content: value,
      }
    })
  }

  const quillDelta = (content, delta, source, editor) => {
    console.log(editor.getContents())
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="content">Content</label>
        <ReactQuill
          theme="snow"
          // value={formData.content}
          defaultValue={decode(formData.content)}
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
          onChange={(e) => handleChange(e)}
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
