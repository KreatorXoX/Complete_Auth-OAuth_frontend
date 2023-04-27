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
import PersistLogin from "./components/PersistLogin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OAuthError from "./pages/OAuthError";
import VerifyYourMail from "./pages/VerifyYourMail";
import OAuthSuccess from "./pages/OAuthSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <PublicPage /> },
      { path: "/login", element: <Login /> },
      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/register/success",
        element: <VerifyYourMail />,
      },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/oauth/success", element: <OAuthSuccess /> },
      { path: "/oauth/error", element: <OAuthError /> },
      {
        path: "/reset-password/:id/:passwordResetCode",
        element: <ResetPassword />,
      },
      {
        element: <PersistLogin />,
        children: [
          {
            element: <AdminRoute />,
            children: [
              { path: "/users", element: <UserList /> }, // admin only
              { path: "/user/:id", element: <UserPage /> }, // admin only
            ],
          },
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: "/main",
                element: <ProtectedPage />,
              }, // authenticated only,
              { path: "/me", element: <ProfileMe /> }, // authenticated only
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
