import axios from 'axios'
import { useState } from 'react'
import { useQuery, useQueryClient, queryOptions } from '@tanstack/react-query'
import { Link, Outlet } from 'react-router'
import { useMovieStore } from '@/stores/movie'

export interface ResponseDataSuccess {
  Response: 'True'
  Search: Movie[]
  totalResults: string
}
export interface ResponseDataError {
  Response: 'False'
  Error: string
}
export type ResponseData = ResponseDataSuccess | ResponseDataError
export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Movies() {
  const queryClient = useQueryClient()
  // const { searchText, setSearchText } = useMovieStore(s => s) // ❌ 잘못된 코드!
  const searchText = useMovieStore(s => s.searchText)
  const setSearchText = useMovieStore(s => s.setSearchText)
  const [inputText, setInputText] = useState(searchText)
  const options = queryOptions({
    queryKey: ['movies', searchText],
    queryFn: async () => {
      // await new Promise(resolve => setTimeout(resolve, 3000))
      const { data } = await axios.post<ResponseData>('/api/movie', {
        title: searchText
      })
      return data
    },
    staleTime: 1000 * 5, // 캐싱하는 시간(ms)
    enabled: Boolean(searchText),
    select: data => {
      const movies = data.Response === 'True' ? data.Search : []
      return movies.filter(movie => Number(movie.Year) <= 2015)
    },
    placeholderData: prev => prev // 깜빡이는 부분에 채워넣을 데이터
  })
  const { data: movies, refetch } = useQuery(options)

  function fetchMovies() {
    setSearchText(inputText)
  }

  return (
    <>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') fetchMovies()
          }}
        />
        <button onClick={() => fetchMovies()}>검색!</button>
      </div>
      <div>
        <button onClick={() => refetch()}>다시 가져오기!(무조건)</button>
        <button onClick={() => queryClient.fetchQuery(options)}>
          다시 가져오기!(신선도에 따라)
        </button>
      </div>
      <div>
        <ul>
          {movies?.map(movie => {
            return (
              <li key={movie.imdbID}>
                <Link to={`/movies/${movie.imdbID}`}>
                  {movie.Title}({movie.Year})
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <Outlet />
    </>
  )
}
