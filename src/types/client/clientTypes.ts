export enum Role {
  Admin = "Admin",
  Editor = "Editor",
  Viewer = "Viewer",
}

export interface UserSignUp {
  id?: number;
  name: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
  password?: string;
  role?: Role.Admin | Role.Editor | Role.Viewer;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
  isDeleted?: boolean;
}

export interface Client {
  id: string;
  name: string;
  useremail: string;
  dob: Date;
  status: Active | Pending | Blocked;
}

export type Active = "ACTIVE";

export type Pending = "PENDING";

export type Blocked = "BLOCKED";

export interface TableRowProps {
  rowsData: UserSignUp[];
  deleteTableRows: Function;
  handleChange: Function;
}

// export interface Clients extends Array<Client> {}

export interface Clients {
  [index: number]: {
    id: string;
    name: string;
    useremail: string;
    dob: Date;
    status: Active | Pending | Blocked;
  }[];
}
