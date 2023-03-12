import { useState } from "react";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const customStyles = {
  control: (baseStyles: any, state: any) => ({
    ...baseStyles,
    outline: "none",
    border: state.menuIsOpen ? "3px solid rgba(96, 165, 250,0.75)" : "none",
    padding: "0.15rem 0.5rem",
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",

    ":hover": {
      ...baseStyles[":hover"],
      borderColor: "rgba(96, 165, 250,0.75)",
    },
  }),
  option: (baseStyles: any, state: any) => ({
    ...baseStyles,
    outline: "none",
    color: "rgb(107 114 128)",
    fontWeight: "500",
    padding: "0.5rem",
    ":hover": {
      ...baseStyles[":hover"],
      backgroundColor: "rgba(96, 165, 250,0.25)",
    },
    backgroundColor: state.isSelected ? "rgba(96, 165, 250,0.55)" : "white",
  }),
  singleValue: (baseStyles: any) => ({
    ...baseStyles,
    color: "rgb(107 114 128)",
    fontWeight: "500",
  }),
  multiValue: (baseStyles: any) => ({
    ...baseStyles,
    backgroundColor: "rgb(241 245 249)",
    color: "rgb(107 114 128)",
    fontWeight: "500",
    padding: "0.1rem",
  }),
  multiValueLabel: (baseStyles: any) => ({
    ...baseStyles,
    color: "rgb(107 114 128)",
    fontWeight: "500",
  }),
};
function App() {
  const [error, setError] = useState(false);
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-200">
      <button
        className="px-4 py-2 rounded bg-red-500 text-xl text-slate-100 mb-20"
        onClick={() => setError((prev) => !prev)}
      >
        Error
      </button>
      <form className="w-full max-w-4xl p-5 space-y-2">
        <div>
          <label
            htmlFor="name"
            className="block pb-1 pl-1 text-gray-500 font-semibold"
          >
            Fullname
          </label>
          <input
            type="text"
            id="name"
            className="w-full py-2 px-4 text-gray-500 focus:text-gray-700 font-semibold rounded-lg shadow-md outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          />
          {error && <p className="text-red-400">Error text is this!</p>}
        </div>
        <div className="w-full flex gap-4">
          <div className="w-1/2">
            <label
              htmlFor="email"
              className="block pb-1 pl-1 text-gray-500 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full py-2 px-4 text-gray-500 focus:text-gray-700 font-semibold rounded-lg shadow-md outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="password"
              className="block pb-1 pl-1 text-gray-500 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full py-2 px-4 text-gray-500 focus:text-gray-700 font-semibold rounded-lg shadow-md outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="fruits"
            className="block pb-1 pl-1 text-gray-500 font-semibold"
          >
            Fruits
          </label>
          <Select
            id="fruits"
            styles={{
              ...customStyles,
            }}
            isClearable
            isSearchable
            options={options}
          />
        </div>
        <div>
          <label
            htmlFor="fruits"
            className="block pb-1 pl-1 text-gray-500 font-semibold"
          >
            Multi Fruits
          </label>
          <Select
            id="multiFruits"
            isMulti
            styles={{
              ...customStyles,
            }}
            isClearable
            isSearchable
            options={options}
          />
        </div>
      </form>
    </div>
  );
}

export default App;
