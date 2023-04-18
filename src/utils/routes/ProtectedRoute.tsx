import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../context/useAuth";
import jwtDecode from "jwt-decode";
interface Props {}

const ProtectedRoute = (props: Props) => {
  const location = useLocation();
  const token = useAuthStore((state) => state.token);
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  const userInfo = (jwtDecode(token!) as AccessTokenType).UserInfo;

  return userInfo ? (
    <Outlet context={{ userId: userInfo._id }} />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoute;
