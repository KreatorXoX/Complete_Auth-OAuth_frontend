import { NavLink } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";

type Props = {};

const ProtectedPage = (props: Props) => {
  const refresh = useRefreshToken();
  return (
    <ul className="h-full w-full flex items-center justify-center gap-10 text-xl font-semibold text-blue-600">
      <li className="underline underline-offset-4  hover:no-underline hover:text-blue-800">
        <NavLink
          className="rounded-lg bg-red-200 hover:bg-red-400  px-4 py-2"
          to="/users"
        >
          All users
        </NavLink>
      </li>
      <li className=" underline underline-offset-4 hover:no-underline hover:text-blue-800">
        <NavLink
          className="rounded-lg bg-red-200 hover:bg-red-400  px-4 py-2"
          to={`/me`}
        >
          Me
        </NavLink>
      </li>
      <li className=" underline underline-offset-4 hover:no-underline hover:text-blue-800">
        <button
          className="rounded-lg bg-red-200 hover:bg-red-400  px-4 py-2"
          onClick={() => refresh()}
        >
          Refresh
        </button>
      </li>
    </ul>
  );
};

export default ProtectedPage;
