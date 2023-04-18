import axios from "axios";

export default axios.create({
  baseURL: "https://auth-restapi.herokuapp.com/api",
});
