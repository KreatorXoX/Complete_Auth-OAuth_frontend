import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthStore } from "../context/useAuth";
import axiosApi from "../api/axios";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);

  const token = useAuthStore((state) => state.token);
  const setCredentials = useAuthStore((state) => state.setCredentials);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const newAccessToken = (await axiosApi.get<IToken>("/auth/refresh"))
          .data.accessToken;

        setCredentials(newAccessToken);
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !token ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
