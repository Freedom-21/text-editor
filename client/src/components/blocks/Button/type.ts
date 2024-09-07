import { ReactNode } from "react";

export interface IButtonProps {
  className?: string;
  disabled?: boolean;
  endIcon?: ReactNode;
  label?: string;
  onClick?: () => void;
  startIcon?: ReactNode;
  type?: "button" | "submit" | "reset";
}
