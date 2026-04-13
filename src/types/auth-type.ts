import { IUser } from "@/lib/mongoose-connect/User";

export type AuthSession = {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  role?: string;
};

export type SessionData = {
  user: IUser;
  session: AuthSession;
};
export type AuthError = {
    code?: string | undefined;
    message?: string | undefined;
    status: number;
    statusText: string;
}