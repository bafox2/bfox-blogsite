import ReactQuill from 'react-quill'
import { modules, formats } from './EditorToolbar'
import 'react-quill/dist/quill.snow.css'

const QuillEditor = (props) => {
  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={props.handleChange}
        value={props.value}
      />
    </div>
  )
}

export default QuillEditor
