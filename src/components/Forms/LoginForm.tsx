import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginUserInput, loginUserSchema } from "../../utils/validationSchema";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/usePrivateAxios";
import Input from "../Input";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../context/useAuth";

const LoginForm = () => {
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/main";

  const setCredentials = useAuthStore((state) => state.setCredentials);
  const navigate = useNavigate();

  const {
    register,
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
      console.log("success");
      setCredentials(response.accessToken);
      navigate(from, { replace: true });
    },
    onError: () => console.log("error"),
  });

  const formHandler: SubmitHandler<LoginUserInput> = (data) => {
    mutation.mutate(data);
  };
  return (
    <div className="h-full w-full flex flex-col justify-center items-center px-5">
      <form
        onSubmit={handleSubmit(formHandler)}
        className="w-full max-w-4xl px-6 py-4 space-y-4 shadow-lg rounded-lg bg-blue-200"
      >
        <Input
          type="email"
          half={false}
          label="Email"
          id="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          half={false}
          label="Password"
          type="password"
          id="password"
          error={errors.password?.message}
          {...register("password")}
        />

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
