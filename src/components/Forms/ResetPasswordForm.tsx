import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  resetPasswordSchema,
  ResetPasswordInput,
} from "../../utils/validationSchema";
import { useMutation } from "@tanstack/react-query";

import Input from "../Input";
import { useParams, Link } from "react-router-dom";

import axios from "../../api/axios";

const ResetPasswordForm = () => {
  const params = useParams();

  const {
    register,

    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordInput>({
    reValidateMode: "onBlur",
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
  });

  const {
    mutate: resetPassword,
    isError,
    isLoading,
    isSuccess,
    error,
    data: response,
  } = useMutation({
    mutationFn: (data: ResetPasswordInput) =>
      axios
        .post(
          `/users/reset-password/${params.id}/${params.passwordResetCode}`,
          { ...data }
        )
        .then((res) => res.data),
  });

  const formHandler: SubmitHandler<ResetPasswordInput> = (data) => {
    resetPassword(data);
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
          type="password"
          label="Pasword"
          id="password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Input
          type="password"
          label="Confirm Password"
          id="confirmPassword"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
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

export default ResetPasswordForm;
