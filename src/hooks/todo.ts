import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}
export type Filter = 'all' | 'todo' | 'done'

const api = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
  headers: {
    'content-type': 'application/json',
    apikey: 'KDT8_bcAWVpD8',
    username: 'KDT8_ParkYoungWoong'
  }
})

export const useTodoFilterStore = create(
  combine(
    {
      filter: 'all' satisfies Filter,
      filters: ['all', 'todo', 'done'] satisfies Filter[] as Filter[]
    },
    set => ({
      setFilter: (filter: Filter) => {
        set({ filter })
      }
    })
  )
)

export function useFetchTodos() {
  const filter = useTodoFilterStore(s => s.filter)
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await api.get<Todo[]>('/')
      return data
    },
    select: todos => {
      return todos.filter(todo => {
        switch (filter) {
          case 'all':
            return true
          case 'todo':
            return todo.done === false
          case 'done':
            return todo.done === true
        }
      })
    }
  })
}

// try {
//   await Promise.all([mutationFn(), onMutate()])
//   onSuccess()
// } catch (error) {
//   onError()
// } finally {
//   onSettled()
// }

export function useCreateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newTodo: Todo) => {
      await new Promise(resolve => setTimeout(resolve, 3000))
      // throw new Error('서버에 문제가 발생했습니다...')
      const { data } = await api.post('/', newTodo)
      return data
    },
    onMutate: newTodo => {
      const prevTodos = queryClient.getQueryData<Todo[]>(['todos'])
      if (prevTodos) {
        queryClient.setQueryData(['todos'], [newTodo, ...prevTodos])
      }
      return prevTodos
    },
    onSuccess: (data, newTodo, prevTodos) => {
      console.log(data, newTodo, prevTodos)
      queryClient.invalidateQueries({ queryKey: ['todos'] }) // 무효화 => 다시 가져와라!
    },
    onError: (error, _newTodo, prevTodos) => {
      if (prevTodos) {
        queryClient.setQueryData(['todos'], prevTodos)
        alert(error.message)
      }
    },
    onSettled: (data, error, newTodo, prevTodos) => {
      console.log(data, error, newTodo, prevTodos)
    }
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (todo: Todo) => {
      // await new Promise(resolve => setTimeout(resolve, 3000))
      // throw new Error('서버에 문제가 발생했습니다...')
      const { data } = await api.put(`/${todo.id}`, todo)
      return data
    },
    onMutate: todo => {
      const prevTodos = queryClient.getQueryData<Todo[]>(['todos'])
      if (prevTodos) {
        const newTodos = prevTodos.map(t => (t.id === todo.id ? todo : t))
        queryClient.setQueryData(['todos'], newTodos)
      }
      return prevTodos
    },
    onSuccess: () => {},
    onError: (error, _todo, prevTodos) => {
      if (prevTodos) {
        queryClient.setQueryData(['todos'], prevTodos)
        alert(error.message)
      }
    },
    onSettled: () => {}
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (todo: Todo) => {
      const { data } = await api.delete(`/${todo.id}`)
      return data
    },
    onMutate: todo => {
      const prevTodos = queryClient.getQueryData<Todo[]>(['todos'])
      if (prevTodos) {
        const newTodos = prevTodos.filter(t => t.id !== todo.id)
        queryClient.setQueryData(['todos'], newTodos)
      }
      return prevTodos
    },
    onSuccess: () => {},
    onError: (error, _todo, prevTodos) => {
      if (prevTodos) {
        queryClient.setQueryData(['todos'], prevTodos)
        alert(error.message)
      }
    },
    onSettled: () => {}
  })
}
