import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URI as string);
// await client.connect();
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
      // Progressive profiling fields stored directly on the BetterAuth user
      industry: {
        type: "string",
        required: false,
      },
      teamSize: {
        type: "string",
        required: false,
      },
      workType: {
        type: "string",
        required: false,
      },
      companyName: {
        type: "string",
        required: false,
      },
      websiteUrl: {
        type: "string",
        required: false,
      },
      profilingCompletedAt: {
        type: "date",
        required: false,
      },
    },
  },
  secret: process.env.NEXT_PUBLIC_BETTER_AUTH_CLIENT_ID!,
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
});
