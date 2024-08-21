export interface User {
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface AuthenticatedResponse {
  access: string;
  user: User;
}

export interface RegistrationResponse {
  registrationCode: string;
}

export interface RegistrationCredentials {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  firstName?: string;
  lastName?: string;
}
