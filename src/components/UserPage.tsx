import { useQuery } from "@tanstack/react-query";
import jwtDecode from "jwt-decode";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { useAuthStore } from "../context/useAuth";

import useAxiosPrivate from "../hooks/usePrivateAxios";
interface Props {}
type ContextType = {
  userId?: string;
};
const UserPage = (props: Props) => {
  const ctx: ContextType = useOutletContext();
  const currentUserId = ctx.userId;
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: user,
  } = useQuery<IUser>({
    queryKey: [`userId-${id}`],
    queryFn: () =>
      axiosPrivate.get<IUser>("/user/" + id).then((res) => res.data),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading spinner ...</p>;

  if (error instanceof Error) return <p>{error.message}</p>;

  return (
    <section className="border border-gray-500 p-5 rounded-lg flex flex-col gap-5">
      <div>
        <h2>Current User Id is : {currentUserId}</h2>
        <p className="text-red-500 text-sm">
          This is authenticated user only page
        </p>
      </div>
      <div>
        <h2>Id : {user?._id}</h2>
        <h2>
          Fullname : {user?.firstName} {user?.lastName}
        </h2>
      </div>
      <Link className="text-blue-600 underline font-bold italic" to="/users">
        Go Back
      </Link>
    </section>
  );
};

export default UserPage;
