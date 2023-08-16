import useAuth from "./useAuth";
import axios from "axios";
import useUser from "./useUser";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const { setUser } = useUser();
  const refresh = async () => {
    const response = await axios.get(
      `https://node-tmdb-backy.onrender.com/api/auth/refresh`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    setAuth((prev) => {
      return {
        ...prev,
        username: response.data.username,
        favorites: response.data.favorites,
        accessToken: response.data.accessToken,
      };
    });
    setUser((prev) => {
      return {
        ...prev,
        username: response.data.username,
        favorites: response.data.favorites,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
