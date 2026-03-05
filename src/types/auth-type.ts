export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
  role?: string;   // 👈 make optional
};
export type AuthSession = {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  role?: string;
};

export type SessionData = {
  user: User;
  session: AuthSession;
};
export type AuthError = {
    code?: string | undefined;
    message?: string | undefined;
    status: number;
    statusText: string;
}