import { NavLink } from "react-router-dom";

interface Props {}

const PublicPage = (props: Props) => {
  return (
    <nav>
      <ul className="h-full w-full flex items-center justify-center gap-10 text-xl font-semibold text-blue-600">
        <li className="underline underline-offset-4  hover:no-underline hover:text-blue-800">
          <NavLink
            className="rounded-lg bg-red-200 hover:bg-red-400  px-4 py-2"
            to="/login"
          >
            Login
          </NavLink>
        </li>
        <li className=" underline underline-offset-4 hover:no-underline hover:text-blue-800">
          <NavLink
            className="rounded-lg bg-red-200 hover:bg-red-400  px-4 py-2"
            to="/register"
          >
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PublicPage;
