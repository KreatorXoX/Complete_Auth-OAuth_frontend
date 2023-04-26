import { useQuery } from "@tanstack/react-query";
import { Link, useOutletContext } from "react-router-dom";
import useAxiosPrivate from "../hooks/usePrivateAxios";
interface Props {}

type ContextType = {
  userId?: string;
};
const ProfileMe = (props: Props) => {
  const axiosPrivate = useAxiosPrivate();

  const ctx: ContextType = useOutletContext();
  const userId = ctx.userId;

  const {
    isLoading,
    error,
    data: user,
  } = useQuery<IUser>({
    queryKey: [`userId-${userId}`],
    queryFn: () =>
      axiosPrivate.get<IUser>("/user/" + userId).then((res) => res.data),
    enabled: !!userId,
  });

  if (isLoading) return <p>Loading spinner ...</p>;

  if (error instanceof Error) return <p>{error.message}</p>;

  return (
    <section className="border border-gray-500 p-5 rounded-lg flex flex-col gap-5">
      <div>
        <h3>Welcome {user?.firstName}</h3>
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
      <Link className="text-blue-600 underline font-bold italic" to="/main">
        Go Back
      </Link>
    </section>
  );
};

export default ProfileMe;
