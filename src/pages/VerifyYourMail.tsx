import React from "react";

type Props = {};

const VerifyYourMail = (props: Props) => {
  return (
    <div className="max-w-5xl mx-auto h-full flex justify-center items-center text-green-500 text-xl text-center font-semibold px-5">
      <h2>
        To access your account and begin utilizing the app, you need to confirm
        your account by clicking on the link we sent to your email during the
        registration process.
      </h2>
    </div>
  );
};

export default VerifyYourMail;
