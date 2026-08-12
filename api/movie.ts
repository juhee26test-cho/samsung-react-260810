import axios from 'axios'

interface RequestBody {
  title?: string
  id?: string
  page?: number
}

export async function POST(request: Request) {
  const { title, id, page = 1 } = (await request.json()) as RequestBody
  const url = id
    ? `https://omdbapi.com?apikey=${process.env.OMDB_API_KEY}&i=${id}`
    : `https://omdbapi.com?apikey=${process.env.OMDB_API_KEY}&s=${title}&page=${page}`
  const { data } = await axios.get(url)
  return Response.json(data)
}

// export async function PUT(request: Request) {
//   // 처리...
//   return Response.json(응답데이터)
// }
