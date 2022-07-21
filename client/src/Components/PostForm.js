import { useState } from 'react'
import axios from 'axios'

const PostForm = (props) => {
  const [formData, setFormData] = useState({
    title: props.title || '',
    content: props.content || '',
    user: props.user?.id || '',
    comments: props.comments || [],
    published: props.published || false,
    imgUrl: props.imgUrl || '',
  })

  let headers = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!props.editing) {
      axios
        .post('/posts/create', formData, headers)
        .then((res) => {
          props.setPosts((prevState) => [...prevState, res.data])
          props.history.push(`/posts/${res.data.e_id}`)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      console.log('editing')
      axios
        .put(`/posts/${props.post.e_id}`, formData, headers)
        .then((res) => {
          props.setPosts((prevState) =>
            prevState.map((post) =>
              post.e_id === res.data.e_id ? res.data : post
            )
          )
          props.history.push(`/posts/${res.data.e_id}`)
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

  return (
    <main>
      <form onSubmit={handleSubmit}>
        {/* title section */}
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          onChange={handleChange}
          value={formData.title}
        />
        {/* imgUrl section */}
        <label htmlFor="imgUrl">Image URL</label>
        <input
          type="text"
          name="imgUrl"
          className="form-control"
          onChange={handleChange}
          value={formData.imgUrl}
        />
        {/* content section */}
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          className="form-control"
          onChange={handleChange}
          value={formData.content}
        />
        <button type="submit" className="btn btn-primary">
          {props.editing ? 'Update' : 'Submit'}
        </button>
        <button type="button" className="btn btn-danger" onClick={clearForm}>
          Clear
        </button>
      </form>
    </main>
  )
}

export default PostForm
