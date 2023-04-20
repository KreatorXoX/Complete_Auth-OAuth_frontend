import { Link } from "react-router-dom";
import UserServices from "../api/services/user.services";
interface Props {}

const UsersPage = (props: Props) => {
  const getAllUsers = UserServices.useGetUsers;

  const { isLoading, data: users } = getAllUsers();

  if (isLoading) return <p>Loading spinner ...</p>;

  return (
    <article>
      <h2 className="text-red-500 text-2xl font-bold">All Users</h2>
      <ul>
        {users?.map((user) => (
          <li key={user._id}>
            <Link to={`/user/${user._id}`}>
              {user.firstName} - {user.lastName}
            </Link>
          </li>
        ))}
      </ul>
      {users && users.length > 0 && <p>No User Found</p>}
    </article>
  );
};

export default UsersPage;
