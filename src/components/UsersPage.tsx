import { Link, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../hooks/usePrivateAxios";
interface Props {}

const UsersPage = (props: Props) => {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: users,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: () => axiosPrivate.get<IUser[]>("/users").then((res) => res.data),
    onError: (err) => {
      console.log(err);
      //  navigate("/login", { state: { from: location }, replace: true });
    },

    // queryFn: UserServices.findAll,
  });

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
      {!users && <p>No User Found</p>}
      <button onClick={() => navigate("/main")}>Go Back</button>
    </article>
  );
};

export default UsersPage;
