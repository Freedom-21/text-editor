import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ISelect } from "./type";
import { HiOutlineUserCircle } from "react-icons/hi";

const animatedComponents = makeAnimated();

const customStyles = {
  control: (provided: any, theme: any) => ({
    ...provided,
    border: "1px solid #E5E7EB",
    marginTop: "5px",
    
    paddingLeft: "2rem",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#9CA3AF", // Set the desired placeholder color here
  }),
};

const Selector: React.FC<ISelect> = ({
  options,
  type,
  onChange,
  placeholder,
  startIcon,
}) => {
  return (
    <div className="relative w-[270px]">
      {startIcon && (
        <span className="absolute left-4 top-1 inset-y-0 z-50 flex items-center pr-3 pointer-events-none text-gray-400 text-lg">
          {startIcon}
        </span>
      )}
      <Select
        closeMenuOnSelect={true}
        components={animatedComponents}
        defaultValue={[options[0], options[1]]}
        isMulti={type === "multi" ? true : false}
        options={options}
        styles={customStyles}
        onChange={onChange}
        placeholder={placeholder ? placeholder : "Select ..."}
      />
    </div>
  );
};

export default Selector;
