import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useCountStore = create(
  combine(
    {
      count: 0
    },
    (set, get) => ({
      increase() {
        // 1) 방식
        const state = get()
        set({
          count: state.count + 1
        })
        // 2) 방식
        set(state => ({
          count: state.count + 1
        }))
      },
      decrease() {}
    })
  )
)
