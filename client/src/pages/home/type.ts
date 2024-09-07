export interface IHomePageProps {}

export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IDocumentProps {
  _id: string;
  title: string;
  data: object;
  pinned: boolean;
  invited_users: [];
  is_deleted: boolean;
  created_by: string;
  updated_by: string;
  createdAt: string;
  updatedAt: string;
  collaboratorsFullName: string[];
  ownersFullName: string[];
}
