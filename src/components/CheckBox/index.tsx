import React from "react";
import PropTypes from "prop-types";

// Define the variants and sizes for the checkbox
const variants = {
  primary:
    "border-gray-800 border border-solid bg-white-A700 checked:border-gray-800 checked:border checked:border-solid checked:bg-white-A700 checked:focus:bg-white-A700 checked:focus:border-gray-800",
};

// Define the custom props for CheckBox using a TypeScript interface
interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name?: string;
  label?: string;
  id?: string;
  variant?: "primary"; // Custom variant prop
}

// Define the CheckBox component using the custom interface
const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  (
    {
      className = "",
      name = "",
      children,
      label = "",
      id = "checkbox_id",
      onChange,
      variant = "primary",
      size = "sm",
      ...restProps
    },
    ref
  ) => {
    // Handle the change event and pass the checked state to the onChange prop
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   if (onChange) onChange(e.target.checked);
    // };

    return (
      <>
        <div
          className={`${className} flex items-center gap-[5px] cursor-pointer`}
        >
          <input
            className={` ${(size) || ""} ${
              (variant && variants[variant]) || ""
            }`}
            ref={ref}
            type="checkbox"
            name={name}
            id={id}
            {...restProps} // Spread remaining props to the input
          />
          {!!label && <label htmlFor={id}>{label}</label>}
        </div>
        {children}
      </>
    );
  }
);

CheckBox.displayName = "CheckBox";

// PropTypes for legacy prop validation
CheckBox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  variant: PropTypes.oneOf(["primary"]),
};

export { CheckBox };
