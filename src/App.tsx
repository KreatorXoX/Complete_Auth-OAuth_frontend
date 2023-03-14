import { useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ValidationSchema,
  validationSchemaUser,
} from "./utils/validationSchema";

import Input from "./components/Input";

function App() {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm<ValidationSchema>({
    reValidateMode: "onBlur",
    mode: "onChange",
    resolver: zodResolver(validationSchemaUser),
  });

  const formHandler: SubmitHandler<ValidationSchema> = (data) => {
    console.log(data);
  };
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-200 px-5">
      <form
        onSubmit={handleSubmit(formHandler)}
        className="w-full max-w-4xl px-6 py-10 space-y-3 border border-gray-300 shadow-lg rounded"
      >
        <div className="w-full flex gap-4">
          <Input
            type="text"
            half={true}
            label="Name"
            id="name"
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            type="email"
            half={true}
            label="Email"
            id="email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        <div className="w-full flex gap-4">
          <Input
            half={true}
            label="Password"
            type="password"
            id="password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Input
            half={true}
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </div>

        <div>
          <Input
            type="select"
            id="fruits"
            half={false}
            label="Fruits"
            error={errors.fruits?.message}
            control={control}
          />
        </div>

        <div>
          <Input
            type="select"
            id="multiFruits"
            half={false}
            label="Multi Fruits"
            error={errors.multiFruits?.message}
            control={control}
            isMulti={true}
          />
        </div>
        <button
          disabled={!isValid}
          type="submit"
          className="w-1/4 mx-auto flex justify-center px-4 py-2 bg-green-700 rounded text-white disabled:bg-gray-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
