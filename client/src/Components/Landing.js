import { useQuery } from 'react-query'
import Post from './Post'

const fetchPosts = async () => {
  const response = await fetch('localhost:3000/posts', {
    method: 'GET',
  })
  const json = await response.json()
  return json
}

const componentDidMount = async () => {
  await fetch('/users')
    .then((res) => {
      console.log(res)
      return res.json()
    })
    .then((users) => {
      console.log(users)
      this.setState({ users })
    })
}
const Landing = () => {
  const { isLoading, error, data } = useQuery('posts', fetchPosts)
  return (
    <div className="landing">
      {componentDidMount()}
      {isLoading && <div>Loading...</div>}
      {error && <div>Error fetching posts</div>}
      {data && data.map((post) => <Post key={post.id} post={post} />)}
    </div>
  )
}

export default Landing
