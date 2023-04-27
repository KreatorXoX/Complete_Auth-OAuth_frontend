import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../context/useAuth";
interface Props {}

const OAuthSuccess = (props: Props) => {
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("accessToken");

  useEffect(() => {
    if (token) {
      setCredentials(token);
    }
  }, [token]);

  return (
    <div className="h-full w-full bg-green-200 flex justify-center items-center flex-col">
      <h2>Welcome!</h2>
      <h4>Your authentication is successfull</h4>
      <Link to="/main" className="underline text-blue-600 font-semibold italic">
        Now you can Go to the Application
      </Link>
    </div>
  );
};

export default OAuthSuccess;
