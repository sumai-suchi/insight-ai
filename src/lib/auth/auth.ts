import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
// import { admin } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

import { sendEmail } from "../email/email";

export const client = new MongoClient(
  process.env.BETTER_AUTH_MONGODB_URI as string,
);

declare global {
  // eslint-disable-next-line no-var
  var __betterAuthMongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * Connects to Mongo only when needed (runtime), and caches the connection promise
 * across hot reloads / serverless invocations.
 */
export async function getAuthMongoClient(): Promise<MongoClient> {
  if (!globalThis.__betterAuthMongoClientPromise) {
    globalThis.__betterAuthMongoClientPromise = client
      .connect()
      .then(() => client);
  }
  return globalThis.__betterAuthMongoClientPromise;
}

const db = client.db("Better_Auth");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    requireEmailVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your InsightAI account",
        html: `
         <div style="font-family: Arial; max-width: 500px; margin: auto;">
  <h2>Welcome to InsightAI! 🤖</h2>
  <p>Click the button below to verify your email:</p>
  <a href="${url}" 
     style="background: #3B82F6; color: white; padding: 12px 24px; 
            border-radius: 999px; text-decoration: none; display: inline-block;">
    Verify Email
  </a>
  <p style="color: #999; font-size: 12px; margin-top: 20px;">
    If you did not sign up, you can ignore this email.
  </p>
</div>
        `,
      });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  user: {
    additionalFields: {
      bio: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        enum: ["admin", "editor", "user"],
      },
      status: {
        type: "string",
        required: false,
        defaultValue: "active",
      },
      discount: {
        type: "number",
        required: false,
        defaultValue: 0,
      },
      isBlocked: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
      plan: {
        type: "string",
        required: false,
        defaultValue: "free",
      },
      article: {
        type: "string",
        required: false,
        defaultValue: 0,
      },
      joinedAt: {
        type: "date",
        required: false,
        defaultValue: new Date(),
      },
    },
  },

  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,

  // plugins: [
  //       emailOTP({
  //           async sendVerificationOTP({ email, otp, type }) {
  //               if (type === "sign-in") {
  //                   // Send the OTP for sign in
  //               } else if (type === "email-verification") {
  //                   // Send the OTP for email verification
  //               } else {
  //                   // Send the OTP for password reset
  //               }
  //           },
  //       })
  //   ]
});
