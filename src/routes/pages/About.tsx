import { useCountStore } from '@/stores/count'

export default function About() {
  // throw new Error('About Page Error!')
  const count = useCountStore(s => s.count)
  const increase = useCountStore(s => s.increase)
  const decrease = useCountStore(s => s.decrease)

  return (
    <>
      <h1>About Page!</h1>
      <h2>{count}</h2>
      <button onClick={() => increase()}>증가!</button>
      <button onClick={() => decrease()}>감소!</button>
    </>
  )
}
