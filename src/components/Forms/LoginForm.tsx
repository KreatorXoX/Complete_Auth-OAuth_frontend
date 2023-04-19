import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginUserInput, loginUserSchema } from "../../utils/validationSchema";
import AuthServices from "../../api/services/auth.services";
import Input from "../Input";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const logUser = AuthServices.useLogin;
  const { mutate } = logUser();
  // const setCredentials = useAuthStore((state) => state.setCredentials);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginUserInput>({
    reValidateMode: "onBlur",
    mode: "onChange",
    resolver: zodResolver(loginUserSchema),
  });

  // const mutation = useMutation({
  //   mutationFn: AuthServices.loginUser,
  //   onMutate: () => console.log("mutating"),
  //   onSuccess: (response) => {
  //     console.log("success");
  //     setCredentials(response.accessToken);
  //     navigate("/main");
  //   },
  //   onError: () => console.log("error"),
  //   onSettled: () => console.log("settled"),
  // });

  const formHandler: SubmitHandler<LoginUserInput> = (data) => {
    mutate(data, { onSuccess: () => navigate("/main") });
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
