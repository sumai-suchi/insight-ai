import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
<<<<<<< HEAD
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
});

console.log(process.env.NEXT_PUBLIC_BETTER_AUTH_URL);
=======
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000"
})

console.log(process.env.NEXT_PUBLIC_BETTER_AUTH_URL)
>>>>>>> ecdc7b6de010a3b1c1b2ffb2dc504ae2a0f9a4ec
