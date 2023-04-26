import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginUserInput, loginUserSchema } from "../../utils/validationSchema";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/usePrivateAxios";
import Input from "../Input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore, usePersistStore } from "../../context/useAuth";

const LoginForm = () => {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/main";

  const setPersist = usePersistStore((state) => state.setPersist);
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const navigate = useNavigate();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginUserInput>({
    reValidateMode: "onBlur",
    mode: "onChange",
    resolver: zodResolver(loginUserSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: LoginUserInput) =>
      axiosPrivate
        .post<IToken>("/auth/login", { ...data })
        .then((res) => res.data),
    onSuccess: (response) => {
      setCredentials(response.accessToken);
      setPersist(getValues("persist")!);
      navigate(from, { replace: true });
    },
    onError: () => console.log("error"),
  });

  const formHandler: SubmitHandler<LoginUserInput> = (data) => {
    mutation.mutate(data);
  };
  return (
    <div className="h-full w-full flex flex-col justify-center items-center px-5">
      <h2 className="text-2xl mb-5 font-semibold text-gray-600">Login Form</h2>
      <form
        onSubmit={handleSubmit(formHandler)}
        className="w-full max-w-4xl px-6 py-4 space-y-4 shadow-lg rounded-lg bg-blue-200"
      >
        <Input
          type="email"
          label="Email"
          id="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          type="password"
          id="password"
          error={errors.password?.message}
          {...register("password")}
        />
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <label
              className="select-none italic font-semibold text-green-600"
              htmlFor="persist"
            >
              Trust this device ?
            </label>
            <input
              id="persist"
              {...register("persist")}
              type="checkbox"
              defaultChecked
            />
          </div>
          <div>
            <Link
              to={"/forgot-password"}
              className="italic underline text-sm text-orange-700 font-medium"
            >
              Forgot your password ?
            </Link>
          </div>
        </div>
        <button
          disabled={!isValid}
          type="submit"
          className="w-full sm:w-1/4 mx-auto flex justify-center p-2 bg-green-700 rounded text-white disabled:bg-gray-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
