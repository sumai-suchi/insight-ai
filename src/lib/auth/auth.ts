import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
// import { admin } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

<<<<<<< HEAD
const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URI as string);
await client.connect();
=======
export const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URI as string);
await client.connect();

>>>>>>> a0359be006eece6cec13ca64d44f9e223377c8b1
const db = client.db("Better_Auth");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
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
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
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
    },
  },

  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
});
