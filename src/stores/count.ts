import { create } from 'zustand'
import { combine, subscribeWithSelector, persist } from 'zustand/middleware'

// create(
//   persist(
//     subscribeWithSelector(
//       combine()
//     ),
//     옵션
//   )
// )

// create(
//   미들웨어1(
//     미들웨어2(
//       미들웨어3()
//     )
//   )
// )

export const useCountStore = create(
  persist(
    subscribeWithSelector(
      combine(
        {
          count: 0,
          double: 0
        },
        (set, get) => ({
          increase() {
            // 1) 방식
            const state = get()
            set({
              count: state.count + 1
            })
          },
          decrease() {
            // 2) 방식
            set(state => ({
              count: state.count - 1
            }))
          }
        })
      )
    ),
    {
      name: 'count store',
      version: 1
    }
  )
)

// subscribeWithSelector 미들웨어 사용!
// useCountStore.subscribe(선택자함수, 실행할함수)
useCountStore.subscribe(
  state => state.count,
  count => {
    useCountStore.setState({
      double: count * 2
    })
  }
)
