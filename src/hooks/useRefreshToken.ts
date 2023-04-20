import axios from "../api/axios";
import { useAuthStore } from "../context/useAuth";

const useRefreshToken = () => {
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const logOut = useAuthStore((state) => state.logOut);

  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
      });
      console.log(response);
      setCredentials(response.data.accessToken);

      return response.data.accessToken;
    } catch (error) {
      logOut();
    }
  };
  return refresh;
};

export default useRefreshToken;
