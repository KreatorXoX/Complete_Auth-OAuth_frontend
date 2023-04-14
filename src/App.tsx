import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Error from './pages/Error'
import Login from './pages/Login'
import PublicPage from './pages/PublicPage'
import Register from './pages/Register'
import UserPage from './pages/UserPage'
import UserList from './pages/UsersPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <PublicPage /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'users', element: <UserList /> }, // admin only
      { path: 'user/:id', element: <UserPage /> } // authenticated only
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
