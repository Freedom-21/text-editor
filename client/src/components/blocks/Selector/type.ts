import { ReactNode } from "react";
import { SingleValue, MultiValue } from "react-select";

export interface ISelect {
  options: object[];
  type: "single" | "multi";
  onChange: (selectedOptions: MultiValue<object> | SingleValue<object>) => void;
  placeholder?: string;
  startIcon?: ReactNode;
}
