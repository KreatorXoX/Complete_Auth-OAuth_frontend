import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
} from "../../utils/validationSchema";
import { useMutation } from "@tanstack/react-query";

import Input from "../Input";

import axios from "../../api/axios";
import { Link } from "react-router-dom";

const ForgotForm = () => {
  const {
    register,

    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordInput>({
    reValidateMode: "onBlur",
    mode: "onChange",
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    mutate: sendResetLink,
    isLoading,
    isError,
    error,
    isSuccess,
    data: response,
  } = useMutation({
    mutationFn: (data: ForgotPasswordInput) =>
      axios.post("/users/forgot-password", { ...data }).then((res) => res.data),
  });

  const formHandler: SubmitHandler<ForgotPasswordInput> = (data) => {
    sendResetLink(data);
  };
  if (isLoading) {
    return <p>loading ...</p>;
  }
  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
  }
  if (isSuccess) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center">
        <p className="text-gray-700">{response}</p>
        <Link className="underline italic text-blue-600 font-bold" to="/login">
          back to Login
        </Link>
      </div>
    );
  }
  return (
    <div className="h-full w-full flex flex-col justify-center items-center px-5">
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

export default ForgotForm;
