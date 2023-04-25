import React from "react";
import ForgotForm from "../components/Forms/ForgotPasswordForm";

type Props = {};

const ForgotPassword = (props: Props) => {
  return (
    <div className="w-full flex flex-col justify-center items-center space-y-10">
      <h2 className="text-red-500 text-2xl">Forgot Password ??? </h2>
      <ForgotForm />
    </div>
  );
};

export default ForgotPassword;
