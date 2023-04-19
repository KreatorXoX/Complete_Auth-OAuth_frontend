import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import UserServices from "../api/services/user.services";

interface Props {}

const UserPage = (props: Props) => {
  const getUser = UserServices.useUserById;
  const { id } = useParams();

  // const {
  //   isLoading,
  //   error,
  //   data: user,
  // } = useQuery<IUser>({
  //   queryKey: [`userId-${id}`],
  //   queryFn: () =>
  //     axiosPrivate.get<IUser>("/user/" + id).then((res) => res.data),
  //   // queryFn: UserServices.findById.bind(null, id!),

  //   enabled: !!id,
  // });
  const { isLoading, error, data: user } = getUser(id!);

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

export default UserPage;
