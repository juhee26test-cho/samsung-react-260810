import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const { data } = useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const { data } = await axios.get('/api/test')
      return data
    },
    notifyOnChangeProps: ['data', 'error'],
    initialData: {
      name: 'Neo',
      age: 22
    }
  })

  return (
    <>
      <h1>Home Page!</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
