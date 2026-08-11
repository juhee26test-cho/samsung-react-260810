import axios from 'axios'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, Outlet } from 'react-router'
import { useMovieStore } from '@/stores/movie'

export interface ResponseData {
  Search: Movie[]
  totalResults: string
  Response: string
}
export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Movies() {
  // const { searchText, setSearchText } = useMovieStore(s => s) // ❌ 잘못된 코드!
  const searchText = useMovieStore(s => s.searchText)
  const setSearchText = useMovieStore(s => s.setSearchText)
  const [inputText, setInputText] = useState(searchText)
  const { data: movies = [] } = useQuery({
    queryKey: ['movies', searchText],
    queryFn: async () => {
      const { data } = await axios.post<ResponseData>('/api/movie', {
        title: searchText
      })
      return data.Search
    },
    staleTime: 1000 * 60 * 60 * 24, // 캐싱하는 시간(ms)
    enabled: Boolean(searchText)
  })

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
        <ul>
          {movies.map(movie => {
            return (
              <li key={movie.imdbID}>
                <Link to={`/movies/${movie.imdbID}`}>{movie.Title}</Link>
              </li>
            )
          })}
        </ul>
      </div>
      <Outlet />
    </>
  )
}
