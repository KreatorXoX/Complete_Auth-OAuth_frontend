interface Props {}

const Error = (props: Props) => {
  return (
    <div className="h-full w-full bg-red-300 flex justify-center items-center">
      <h2 className="text-2xl font-semibold">Error</h2>
    </div>
  );
};

export default Error;
