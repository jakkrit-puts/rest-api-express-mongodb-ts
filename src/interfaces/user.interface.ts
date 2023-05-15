export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}

export interface UserUpdatePayload {
  id: string;
  password: string;
  firstname: string;
  lastname: string;
}

