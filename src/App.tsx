import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Error from "./pages/Error";
import Login from "./pages/Login";
import PublicPage from "./pages/PublicPage";
import Register from "./pages/Register";
import UserPage from "./components/UserPage";
import UserList from "./components/UsersPage";
import AdminRoute from "./utils/routes/AdminRoute";
import ProtectedRoute from "./utils/routes/ProtectedRoute";
import ProtectedPage from "./pages/ProtectedPage";
import ProfileMe from "./components/ProfileMe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <PublicPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        element: <AdminRoute />,
        children: [
          { path: "/users", element: <UserList /> }, // admin only
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/main", element: <ProtectedPage /> }, // authenticated only,
          { path: "/me", element: <ProfileMe /> }, // authenticated only
          { path: "/user/:id", element: <UserPage /> }, // authenticated only
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
