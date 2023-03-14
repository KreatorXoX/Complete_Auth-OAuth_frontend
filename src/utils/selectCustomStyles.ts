export const customStyles = {
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
