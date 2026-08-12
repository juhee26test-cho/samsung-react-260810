import { NavLink } from 'react-router'

const navigations = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/signin', label: 'Sign In' },
  { to: '/movies', label: 'Movies' },
  { to: '/todos', label: 'Todos' }
]

export default function Header() {
  return (
    <header className="flex gap-3">
      {navigations.map(nav => {
        return (
          <NavLink
            key={nav.to}
            to={nav.to}
            className={({ isActive }) => {
              return isActive ? 'text-red-500' : ''
            }}>
            {nav.label}
          </NavLink>
        )
      })}
    </header>
  )
}
