import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import UserServices from "../api/services/user.services";
interface Props {}

type ContextType = {
  userId?: string;
};
const ProfileMe = (props: Props) => {
  const ctx: ContextType = useOutletContext();
  const userId = ctx.userId;

  const {
    isLoading,
    error,
    data: user,
  } = useQuery<IUser>({
    queryKey: [`userId-${userId}`],
    queryFn: UserServices.findById.bind(null, userId!),
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
