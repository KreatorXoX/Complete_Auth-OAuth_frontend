import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuthStore } from "../context/useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (err) => {
        Promise.reject(err);
      }
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const originalReq = err?.config;

        if (err?.response?.status === 403 && !originalReq?.sent) {
          originalReq.sent = true;
          const newAccessToken = await refresh();
          originalReq.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(originalReq);
        }

        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [token, refresh]);
  return axiosPrivate;
};

export default useAxiosPrivate;
