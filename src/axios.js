import axios from "axios";
export default axios.create({
  baseURL: `https://node-tmdb-backy.onrender.com/api/users/${email}/api/users`,
});
