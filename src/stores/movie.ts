import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useMovieStore = create(
  // 타입 추론!
  // combine(상태객체, 액션함수)
  combine(
    {
      searchText: ''
    },
    set => {
      return {
        setSearchText: (searchText: string) => {
          set({ searchText })
        }
      }
    }
  )
)
