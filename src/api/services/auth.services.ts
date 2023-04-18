import axios from "../axios";
import {
  RegisterUserInput,
  LoginUserInput,
} from "../../utils/validationSchema";

const loginUser = async (userInformation: LoginUserInput) => {
  const response = await axios.post<IToken>("/auth/login", userInformation);
  return response.data;
};
const registerUser = async (userInformation: RegisterUserInput) => {
  const response = await axios.post<IToken>("/auth/register", userInformation);
  return response.data;
};

const AuthServices = {
  loginUser,
  registerUser,
};
export default AuthServices;
