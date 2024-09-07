import { IDocumentProps } from "pages/home/type";

export interface INavbarProps {
  setValue: (data: IDocumentProps[]) => void;
  pinned: IDocumentProps[];
  invited: IDocumentProps[];
  recent: IDocumentProps[];
}
