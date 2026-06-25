import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/login', element: <LoginPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
