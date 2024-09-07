import { ReactNode } from "react";

export interface IInputProps {
  name?: string;
  type: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
  placeholder?: string;
  className?: string;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
