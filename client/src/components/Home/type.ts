import { IDocumentProps, IUser } from "pages/home/type";

export interface IHomeComponentProps {
  document: IDocumentProps[];
  loggedUser: IUser;
}
