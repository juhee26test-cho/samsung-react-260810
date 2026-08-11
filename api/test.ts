// http://localhost:3000/api/test
export async function GET() {
  return Response.json({
    name: 'HEROPY',
    age: 85
  })
  return new Response(
    JSON.stringify({
      name: 'HEROPY',
      age: 85
    })
  )
}
