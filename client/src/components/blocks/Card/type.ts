import { ReactNode } from "react";

export interface ICardProps {
  children: ReactNode;
  className?: string;
  type: "flex" | "center";
  key?: string;
}
