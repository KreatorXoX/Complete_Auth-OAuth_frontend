import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

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
    <section>
      <h3>Welcome</h3>
      <h2>
        {user?.firstName} - {user?.lastName}
      </h2>
    </section>
  );
};

export default UserPage;
