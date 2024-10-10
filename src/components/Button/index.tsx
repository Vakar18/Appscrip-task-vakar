import React from "react";
import PropTypes from "prop-types";

// Define shapes, variants, and sizes
const shapes = {
  square: "rounded-[0px]",
  round: "rounded-[5px]",
};
const variants = {
  fill: {
    white_A700: "bg-white-A700 text-gray-900",
    black_900_75: "bg-black-900_75 text-white-A700",
  },
};
const sizes = {
  sm: "h-[70px] px-[35px] text-xl",
  xs: "h-[48px] px-[35px] text-lg",
};

// Define the custom props for Button using a TypeScript interface
// Omit the 'size' from the button attributes and replace with custom size
interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  className?: string;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  shape?: "square" | "round";  // Custom shape prop
  size?: "sm" | "xs";          // Custom size prop
  variant?: "fill";            // Custom variant prop
  color?: "white_A700" | "black_900_75"; // Custom color prop
}

// Define the Button component using the custom interface
const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "xs",
  color = "black_900_75",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer uppercase ${
        (shape && shapes[shape]) || ""
      } ${(size && sizes[size]) || ""} ${
        (variant && variants[variant]?.[color]) || ""
      }`}
      {...restProps} // Spread remaining props to the button
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

// PropTypes for legacy prop validation
Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["square", "round"]),
  size: PropTypes.oneOf(["sm", "xs"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["white_A700", "black_900_75"]),
};

export { Button };
