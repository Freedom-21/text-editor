import { ChangeEvent } from "react";

export interface IAppBar {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  loggedUser: {
    first_name: string;
    last_name: string;
  };
}
