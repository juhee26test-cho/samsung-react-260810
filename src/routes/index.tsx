// Data Mode(CSR)
// https://heropy.dev/#/movies/ => Hash Router
// https://heropy.dev/movies => Browser Router
import { createBrowserRouter, RouterProvider } from 'react-router'
import { dynamic } from './dynamic'
import Default from '@/routes/layouts/Default'
import Home from '@/routes/pages/Home'
// import About from '@/routes/pages/About'
// import SignIn from '@/routes/pages/SignIn'
import Movies from '@/routes/pages/Movies'
import MovieDetails from '@/routes/pages/MovieDetails'
import Todos from '@/routes/pages/Todos'
// import NotFound from '@/routes/pages/NotFound'
// import { requiresAuth } from '@/routes/loaders'
import Loader from '@/components/Loader'

const dynamicOptions = {
  loading: <Loader />
}

// const Home = dynamic(() => import('@/routes/pages/Home'), dynamicOptions)
const About = dynamic(() => import('@/routes/pages/About'), dynamicOptions)
const SignIn = dynamic(() => import('@/routes/pages/SignIn'), dynamicOptions)
// const Movies = dynamic(() => import('@/routes/pages/Movies'), dynamicOptions)
// const MovieDetails = dynamic(() => import('@/routes/pages/MovieDetails'), dynamicOptions)
const NotFound = dynamic(
  () => import('@/routes/pages/NotFound'),
  dynamicOptions
)

const router = createBrowserRouter([
  {
    element: <Default />,
    children: [
      {
        path: '/', // http://localhost:5173/
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/signin',
        element: <SignIn />
      },
      {
        path: '/movies',
        // loader: requiresAuth,
        element: <Movies />,
        children: [
          {
            path: '/movies/:movieId',
            element: <MovieDetails />
          }
        ]
      },
      {
        path: '/todos',
        element: <Todos />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
