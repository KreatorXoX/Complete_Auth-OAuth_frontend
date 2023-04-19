import axios from "../api/axios";
import { useAuthStore } from "../context/useAuth";

const useRefreshToken = () => {
  const setCredentials = useAuthStore((state) => state.setCredentials);

  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    console.log(response);
    setCredentials(response.data.accessToken);

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;