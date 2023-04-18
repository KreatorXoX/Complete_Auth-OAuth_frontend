import Input from "../Input";
import {
  registerUserSchema,
  RegisterUserInput,
} from "../../utils/validationSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import AuthServices from "../../api/services/auth.services";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../context/useAuth";
interface Props {}

const RegisterForm = (props: Props) => {
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterUserInput>({
    reValidateMode: "onBlur",
    mode: "onChange",
    resolver: zodResolver(registerUserSchema),
  });

  const mutation = useMutation({
    mutationFn: AuthServices.registerUser,
    onMutate: () => console.log("mutating"),
    onSuccess: (response) => {
      console.log("success");
      setCredentials(response.accessToken);
      navigate("/main");
    },
    onError: () => console.log("error"),
    onSettled: () => console.log("settled"),
  });

  const formHandler: SubmitHandler<RegisterUserInput> = async (data) => {
    mutation.mutateAsync(data);
  };
  return (
    <div className="h-full w-full flex flex-col justify-center items-center px-5">
      <form
        onSubmit={handleSubmit(formHandler)}
        className="w-full max-w-4xl px-6 py-4 space-y-4 shadow-lg rounded-lg bg-blue-200"
      >
        <div className="w-full flex flex-col sm:flex-row gap-4 ">
          <Input
            type="text"
            half={false}
            label="First Name"
            id="firstName"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <Input
            type="text"
            half={false}
            label="Last Name"
            id="lastName"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>
        <Input
          type="email"
          half={false}
          label="Email"
          id="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="w-full flex flex-col sm:flex-row gap-4 ">
          <Input
            half={false}
            label="Password"
            type="password"
            id="password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Input
            half={false}
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
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

export default RegisterForm;
