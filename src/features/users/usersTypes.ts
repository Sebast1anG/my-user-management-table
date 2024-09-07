export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export interface UsersState {
  users: User[];
  filter: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
  status: "idle" | "loading" | "succeeded" | "failed";
}
