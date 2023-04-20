import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
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
      axiosPrivate.get<IUser>("/user" + userId).then((res) => res.data),
    onSettled: (response) => {
      console.log(response?._id);
    },
    enabled: !!userId,
  });

  if (isLoading) return <p>Loading spinner ...</p>;

  if (error instanceof Error) return <p>{error.message}</p>;

  return (
    <section>
      <h3>Welcome</h3>
      <h2>
        {user?.firstName} - {user?.lastName}
      </h2>
    </section>
  );
};

export default ProfileMe;
