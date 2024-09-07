import { IDocumentProps } from "components/Home/type";

export interface INavbarProps {
  setValue: (data: IDocumentProps[]) => void;
  pinned: IDocumentProps[];
  invited: IDocumentProps[];
  recent: IDocumentProps[];
}
