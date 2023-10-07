/* eslint-disable prettier/prettier */
export interface JwtPayload {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Student" | "Trainer";
}
