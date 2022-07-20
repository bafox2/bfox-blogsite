import { useQuery } from 'react-query'
import Post from './Post'

//write a function to fetch posts
async function fetchPosts() {
  return await fetch('/posts').then((res) => {
    console.log(res)
    res.json()
  })
}

//i don't know how to make fetchPosts trigger in the component
const Landing = () => {
  const { data, status } = useQuery('posts', fetchPosts())
  console.log(data)
  console.log(status)
  return (
    <div>
      <h1>Landing</h1>
      {data &&
        data.map((post) => {
          return <Post post={post} />
        })}
    </div>
  )
}

export default Landing
