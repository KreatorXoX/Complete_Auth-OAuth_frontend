import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
} from "../../utils/validationSchema";
import { useMutation } from "@tanstack/react-query";

import Input from "../Input";
import { Link, useNavigate } from "react-router-dom";

import axios from "../../api/axios";

const ForgotForm = () => {
  const navigate = useNavigate();

  const {
    register,

    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordInput>({
    reValidateMode: "onBlur",
    mode: "onChange",
    resolver: zodResolver(forgotPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: ForgotPasswordInput) =>
      axios.post("/users/forgot-password", { ...data }).then((res) => res.data),
    onSuccess: (response) => {
      console.log(response);
    },
    onError: () => console.log("error"),
  });

  const formHandler: SubmitHandler<ForgotPasswordInput> = (data) => {
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
