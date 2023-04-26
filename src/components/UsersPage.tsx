import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/usePrivateAxios";
interface Props {}

const UsersPage = (props: Props) => {
  const axiosPrivate = useAxiosPrivate();

  const { isLoading, data: users } = useQuery({
    queryKey: ["all-users"],
    queryFn: () => axiosPrivate.get<IUser[]>("/users").then((res) => res.data),
  });

  if (isLoading) return <p>Loading spinner ...</p>;

  return (
    <article className="border border-gray-500 py-5 px-10 rounded-lg flex flex-col gap-4">
      <div>
        <h3 className="text-red-500 text-2xl font-bold">All Users</h3>
        <p className="text-red-500 text-sm">This is admin user only page</p>
      </div>
      <ul className=" list-disc px-4 text-purple-500 space-y-4">
        {users?.map((user) => (
          <li
            key={user._id}
            className="px-4 py-1 border border-purple-500 rounded"
          >
            <Link to={`/user/${user._id}`}>
              {user.firstName} - {user.lastName}
            </Link>
          </li>
        ))}
      </ul>
      {!users && <p>No User Found</p>}
      <Link className="text-blue-600 underline font-bold italic" to="/main">
        Go Back
      </Link>
    </article>
  );
};

export default UsersPage;
