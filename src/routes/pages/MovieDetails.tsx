// http://localhost:5173/movies/tt2250912
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Modal from '@/components/Modal'

export interface Movie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}
export interface Rating {
  Source: string
  Value: string
}

export default function MovieDetails() {
  const { movieId } = useParams()
  // const 반환값 = useQuery<데이터타입>(옵션)
  const { data: movie } = useQuery<Movie>({
    queryKey: ['movie details', movieId],
    queryFn: async () => {
      const { data } = await axios.post<Movie>('/api/movie', {
        id: movieId
      })
      return data
    },
    staleTime: 1000 * 60 * 60 * 24
  })
  const navigate = useNavigate()

  return (
    <Modal
      onClose={() => {
        navigate('/movies')
      }}>
      {movie && (
        <>
          <h1>{movie.Title}</h1>
          <p>{movie.Plot}</p>
          <img
            src={movie.Poster}
            alt={movie.Title}
          />
        </>
      )}
    </Modal>
  )
}
