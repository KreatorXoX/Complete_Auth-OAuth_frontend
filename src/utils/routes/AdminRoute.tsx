import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../context/useAuth";
import jwtDecode from "jwt-decode";
interface Props {}

const AdminRoute = (props: Props) => {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  const isAdmin = (jwtDecode(token!) as AccessTokenType).UserInfo.isAdmin;
  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default AdminRoute;
