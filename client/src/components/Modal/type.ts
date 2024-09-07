import { IUser } from "pages/home/type";
import { ReactNode } from "react";

export interface IModalProps {
  showModal: boolean;
  toggleModal: () => void;
  userList?: IUser[];
}

export interface IDeleteModalProps {
  showModal: boolean;
  toggleDeleteModal: () => void;
  id: string;
}
