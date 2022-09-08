export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
}

export const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'script',
  'code-block',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
]

export const parseEditorData = (content, editor) => {
  const delta = editor.getContents()
  const text = editor.getText()
  const html = editor.root.innerHTML
  return { delta, text, html }
}

export const EditorToolbar = () => (
  <div id="toolbar">
    <select
      className="ql-header"
      defaultValue={''}
      onChange={(e) => e.persist()}
    >
      <option value="1" />
      <option value="2" />
      <option value="3" />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />
    <button className="ql-strike" />
    <button className="ql-blockquote" />
    <button className="ql-code-block" />
    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />
    <button className="ql-indent" value="-1" />
    <button className="ql-indent" value="+1" />
    <select className="ql-align" />
    <button className="ql-link" />
    <button className="ql-image" />
    <button className="ql-clean" />
  </div>
)

export default EditorToolbar
