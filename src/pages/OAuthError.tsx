interface Props {}

const OAuthError = (props: Props) => {
  return (
    <div className="h-full w-full bg-red-300 flex justify-center items-center">
      <h2 className="text-2xl font-semibold">
        OAuth Error Please try again later or consider Singing up a Account
      </h2>
    </div>
  );
};

export default OAuthError;
