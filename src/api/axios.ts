import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// export const privateAxios = axios.create({
//   baseURL: "http://localhost:1337/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });
