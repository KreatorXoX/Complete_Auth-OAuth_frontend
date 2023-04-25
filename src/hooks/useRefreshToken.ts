import axios from "../api/axios";
import { useAuthStore } from "../context/useAuth";

const setCredentials = useAuthStore.getState().setCredentials;
const logOut = useAuthStore.getState().logOut;

const useRefreshToken = () => {
  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh", {
        withCredentials: true,
      });

      setCredentials(response.data.accessToken);

      return response.data.accessToken;
    } catch (error) {
      logOut();
    }
  };
  return refresh;
};

export default useRefreshToken;
