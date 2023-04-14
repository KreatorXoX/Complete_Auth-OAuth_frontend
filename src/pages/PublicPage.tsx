import { NavLink } from 'react-router-dom'
import { useAuthStore } from '../context/useAuth'
interface Props {}

const PublicPage = (props: Props) => {
  const userToken = useAuthStore(state => state.token)
  if (!userToken) {
    return (
      <nav>
        <ul className='h-full w-full flex items-center justify-center gap-10 text-xl font-semibold text-blue-600'>
          <li className='underline underline-offset-4  hover:no-underline hover:text-blue-800'>
            <NavLink
              className='rounded-lg bg-red-200 hover:bg-red-400  px-4 py-2'
              to='/login'
            >
              Login
            </NavLink>
          </li>
          <li className=' underline underline-offset-4 hover:no-underline hover:text-blue-800'>
            <NavLink
              className='rounded-lg bg-red-200 hover:bg-red-400  px-4 py-2'
              to='/register'
            >
              Register
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }

  return (
    <nav>
      <ul className='h-full w-full flex items-center justify-center gap-10 text-xl font-semibold text-blue-600'>
        <li className='underline underline-offset-4  hover:no-underline hover:text-blue-800'>
          <NavLink
            className='rounded-lg bg-red-200 hover:bg-red-400  px-4 py-2'
            to='/users'
          >
            Admin Only Users
          </NavLink>
        </li>
        <li className='underline underline-offset-4  hover:no-underline hover:text-blue-800'>
          <NavLink
            className='rounded-lg bg-red-200 hover:bg-red-400  px-4 py-2'
            to='/user/'
          >
            Me
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default PublicPage
