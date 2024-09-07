import React from "react";
import { IInputProps } from "./type";

const InputField: React.FC<IInputProps> = ({
  name,
  type,
  startIcon,
  endIcon,
  onClick,
  placeholder,
  className,
  onChange,
  value,
}) => {
  return (
    <div className="relative">
      {startIcon && (
        <span className="absolute inset-y-0 left-4 flex items-center pr-3 pointer-events-none text-gray-400 text-lg">
          {startIcon}
        </span>
      )}
      <input
        type={type}
        className={`${className} py-2 pl-10 pr-10 border text-gray border-gray-light rounded-md focus:outline-none focus:ring-0 w-full`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
      />

      {endIcon && (
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400"
          onClick={onClick}
        >
          {endIcon}
        </button>
      )}
    </div>
  );
};

export default InputField;
