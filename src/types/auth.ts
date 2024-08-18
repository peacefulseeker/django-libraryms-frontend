export interface User {
  uuid: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
}

export type AuthenticatedResponse = {
  access: string;
  user: User;
};
