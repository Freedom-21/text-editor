import React from "react";
import { IButtonProps } from "./type";

const Button: React.FC<IButtonProps> = ({
  label,
  startIcon,
  endIcon,
  className,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`text-white ${className}  flex justify-center items-center ${
        disabled
          ? "bg-gray-300 hover:bg-gray-300"
          : "bg-[#1E56A0] hover:bg-[#2174C9]"
      } text-lg font-semibold  h-[40px] rounded-md  mt-8`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && startIcon}
      {label && label}
      {endIcon && endIcon}
    </button>
  );
};

export default Button;
