import ResetPasswordForm from "../components/Forms/ResetPasswordForm";

type Props = {};

const ResetPassword = (props: Props) => {
  return (
    <div className="w-full flex flex-col justify-center items-center space-y-10">
      <h2 className="text-red-500 text-2xl">Forgot Password ??? </h2>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPassword;
