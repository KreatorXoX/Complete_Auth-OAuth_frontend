import { useQuery } from "@tanstack/react-query";
import axiosApi from "../axios";

// get users by their role
const getUsers = async () => {
  const result = await axiosApi.get<IUser[]>(`/users`);
  return result.data;
};
export const useGetUsers = () => {
  return useQuery({
    queryKey: [`all users`],
    queryFn: () => getUsers(),
  });
};

// get user by id
const getUserById = async (id: string) => {
  const result = await axiosApi.get<IUser>(`/user/${id}`);
  return result.data;
};
export const useUserById = (id: string) => {
  return useQuery({
    queryKey: [`userID-${id}`],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};

const UserServices = {
  useGetUsers,
  useUserById,
};
export default UserServices;
