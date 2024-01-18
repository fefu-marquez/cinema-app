export interface User {
  email: string;
  password: string;
}

export interface UserWithProfile {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}