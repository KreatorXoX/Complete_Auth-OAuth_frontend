import { useQuery } from "@tanstack/react-query";

import { useParams, Link } from "react-router-dom";

import useAxiosPrivate from "../hooks/usePrivateAxios";
interface Props {}

const UserPage = (props: Props) => {
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
        <p className="text-red-500 text-sm">This is an admin only page</p>
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
