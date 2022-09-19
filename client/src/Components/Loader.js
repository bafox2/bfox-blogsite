const Loader = (props) => {
  return (
    props.loading && (
      <div className="loader">
        <h1>Loading...</h1>
      </div>
    )
  )
}
export default Loader
