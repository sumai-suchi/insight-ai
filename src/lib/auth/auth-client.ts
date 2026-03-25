import { createAuthClient } from "better-auth/react";
import { emailOTPClient, twoFactorClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,

  plugins: [
    emailOTPClient(),
    twoFactorClient({
      onTwoFactorRedirect() {
        //after login 2FA is present redireat happend
        window.location.href = "/verify-2fa";
      },
    }),
  ],
});

console.log(process.env.NEXT_PUBLIC_BETTER_AUTH_URL);
