import { useState, useEffect } from 'react'
import { useUpdateTodo, useDeleteTodo } from '@/hooks/todo'
import type { Todo } from '@/hooks/todo'

interface Props {
  todo: Todo
}

export default function TodoItem({ todo }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [done, setDone] = useState(todo.done)
  const { mutateAsync: mutateForUpdate } = useUpdateTodo()
  const { mutateAsync: mutateForDelete } = useDeleteTodo()

  useEffect(() => {
    if (done !== todo.done) {
      mutateForUpdate({
        ...todo,
        done
      })
    }
    // eslint-disable-next-line
  }, [done, todo])

  function onEditMode() {
    setIsEditing(true)
  }
  function offEditMode(title = todo.title) {
    setIsEditing(false)
    setTitle(title)
  }
  function saveTodo() {
    if (!title.trim() || todo.title === title) return
    mutateForUpdate({
      ...todo,
      title
    })
    offEditMode(title)
  }
  function deleteTodo() {
    mutateForDelete(todo)
    offEditMode()
  }

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => {
              if (e.nativeEvent.isComposing) return
              if (e.key === 'Enter') saveTodo()
              if (e.key === 'Escape') offEditMode()
            }}
          />
          <button onClick={() => offEditMode()}>취소</button>
          <button onClick={() => saveTodo()}>저장</button>
          <button onClick={() => deleteTodo()}>삭제</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={done}
            onChange={e => setDone(e.target.checked)}
          />
          <h3>{todo.title}</h3>
          <button onClick={() => onEditMode()}>수정</button>
        </>
      )}
    </li>
  )
}
