import {
  Outlet,
  Navigate,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
import { useAuthStore } from "../../context/useAuth";
import jwtDecode from "jwt-decode";
interface Props {}

const ProtectedRoute = (props: Props) => {
  const location = useLocation();
  const token = useAuthStore((state) => state.token);
  const logOut = useAuthStore((state) => state.logOut);
  const navigate = useNavigate();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  const userInfo = (jwtDecode(token!) as AccessTokenType).UserInfo;

  return userInfo ? (
    <Outlet context={{ userId: userInfo._id }} />
  ) : (
    <div className="h-full w-full bg-gray-200 flex flex-col gap-5 justify-center items-center text-red-500">
      <h2 className="text-2xl font-semibold text-center">
        You need to be logged in
      </h2>
      <Link
        to="/login"
        className="text-blue-600 underline font-bold italic"
        state={{ from: location }}
        onClick={logOut}
      >
        Go to Login
      </Link>
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 underline font-bold italic"
      >
        Go to Back
      </button>
    </div>
  );
};

export default ProtectedRoute;
