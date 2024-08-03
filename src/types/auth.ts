export interface User {
  uuid: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
}

export type AuthenticatedResponse = {
  access: string;
  user: User;
};
