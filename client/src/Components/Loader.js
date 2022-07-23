const Loader = (props) => {
  return (
    <div className="loader" hidden={!props.loading}>
      <h1>Loading...</h1>
    </div>
  )
}
export default Loader
