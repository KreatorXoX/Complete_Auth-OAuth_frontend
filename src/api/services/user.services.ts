import axios from '../axios'

const findAll = async () => {
  const response = await axios.get<IUser[]>('/api/users')
  return response.data
}
const findById = async (id: string) => {
  const response = await axios.get<IUser>('/api/user/' + id)
  return response.data
}

const UserServices = {
  findAll,
  findById
}
export default UserServices
