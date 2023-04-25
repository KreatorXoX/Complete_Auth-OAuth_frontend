import { Outlet } from "react-router-dom";

import { useAuthStore } from "../context/useAuth";

interface Props {}

const RootLayout = (props: Props) => {
  const logOut = useAuthStore((state) => state.logOut);
  const token = useAuthStore((state) => state.token);
  return (
    <main className="h-screen w-full bg-blue-100">
      <div className="h-20 border-b-2 border-b-orange-300 w-full flex justify-center items-center flex-col">
        <h2 className="text-2xl text-blue-700 font-medium tracking-wide">
          Auth Example
        </h2>
        {token && <button onClick={logOut}>Logout</button>}
      </div>
      <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
