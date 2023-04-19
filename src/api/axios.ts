import axios from "axios";
import { useAuthStore } from "../context/useAuth";

const axiosApi = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosApi.interceptors.request.use(
  (config) => {
    if (!config.headers["Authorization"]) {
      const token = useAuthStore.getState().token;
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

axiosApi.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalReq = err?.config;

    if (err?.response?.status === 403 && !originalReq?.sent) {
      originalReq.sent = true;
      const newAccessToken = await axios.get<IToken>(
        "http://localhost:1337/api/auth/refresh",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      useAuthStore.setState({ token: newAccessToken.data.accessToken });
      originalReq.headers[
        "Authorization"
      ] = `Bearer ${newAccessToken.data.accessToken}`;
      return axiosApi(originalReq);
    }

    return Promise.reject(err);
  }
);

export default axiosApi;
