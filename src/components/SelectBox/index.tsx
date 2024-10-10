import React, { useState, useEffect } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { Props as ReactSelectProps } from "react-select"; // Import react-select prop types

// Define the shape of the props for SelectBox
interface SelectBoxProps extends ReactSelectProps {
  shape?: "square"; // Custom prop
  indicator?: React.ReactNode; // Custom prop
  size?: "xs"; // Custom prop
  className?: string;
}

const shapes = {
  square: "rounded-[0px]",
};

const sizes = {
  xs: "h-[22px] pr-6 text-lg",
};

// Define SelectBox component with SelectBoxProps interface
const SelectBox = React.forwardRef<any, SelectBoxProps>(
  (
    {
      className = "",
      options = [],
      isSearchable = false,
      isMulti = false,
      indicator,
      shape,  // Custom shape prop
      size = "xs",
      ...restProps // Forward other valid props to react-select
    },
    ref
  ) => {
    const [menuPortalTarget, setMenuPortalTarget] = useState<HTMLElement | null>(null);

    useEffect(() => {
      setMenuPortalTarget(document.body);
    }, []);

    return (
      <div className={`${className} ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""}`}>
        <Select
          ref={ref}
          options={options}
          classNamePrefix="react-select"
          isSearchable={isSearchable}
          isMulti={isMulti}
          components={{
            IndicatorSeparator: () => null,
            ...(indicator && { DropdownIndicator: () => indicator }),
          }}
          styles={{
            container: (provided) => ({
              ...provided,
              zIndex: 0,
            }),
            control: (provided) => ({
              ...provided,
              backgroundColor: "transparent",
              border: "0 !important",
              boxShadow: "0 !important",
              minHeight: "auto",
              width: "100%",
              "&:hover": {
                border: "0 !important",
              },
            }),
            input: (provided) => ({
              ...provided,
              color: "inherit",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? "#ffffff" : "transparent",
              color: state.isSelected ? "#252020" : "inherit",
              "&:hover": {
                backgroundColor: "#ffffff",
                color: "#252020",
              },
            }),
            valueContainer: (provided) => ({
              ...provided,
              padding: 0,
            }),
            placeholder: (provided) => ({
              ...provided,
              margin: 0,
            }),
            menu: (provided) => ({
              ...provided,
              display: "block",
            }),
            // menuPortal: (base) => ({
            //   ...base,
            //   zIndex: 999999,
            //   position: "absolute",
            //   menuPortalTarget: menuPortalTarget, // Managed internally
            // }),
          }}
          {...restProps} // Pass only valid props to react-select
        />
      </div>
    );
  }
);

SelectBox.displayName = "SelectBox";

SelectBox.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  isSearchable: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  indicator: PropTypes.node,
  shape: PropTypes.oneOf(["square"]),
  size: PropTypes.oneOf(["xs"]),
};

export { SelectBox };
