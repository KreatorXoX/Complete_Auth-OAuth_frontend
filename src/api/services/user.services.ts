import axios from "../axios";

const findAll = async () => {
  const response = await axios.get<IUser[]>("/users");
  return response.data;
};
const findById = async (id: string) => {
  const response = await axios.get<IUser>("/user/" + id);
  return response.data;
};

const UserServices = {
  findAll,
  findById,
};
export default UserServices;
