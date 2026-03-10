import { headers } from "next/headers";
import { MongoClient } from "mongodb";
import { auth } from "@/lib/auth/auth";

export type UserProfilingContext = {
  userId: string;
  industry: string;
  teamSize: string;
  workType: string;
  companyName: string;
  websiteUrl: string;
  completedAt: Date | null;
};

function getBetterAuthUserCollection() {
  const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URI as string);
  const db = client.db("Better_Auth");
  return { client, collection: db.collection("user") };
}

/**
 * Server-side helper to fetch progressive profiling fields for the current session user
 * from the Better_Auth.user collection.
 */
export async function getUserProfilingContext(): Promise<UserProfilingContext | null> {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (!session?.user?.id) return null;

  const { client, collection } = getBetterAuthUserCollection();

  try {
    await client.connect();
    const doc = await collection.findOne({ _id: session.user.id });
    if (!doc) return null;

    return {
      userId: session.user.id,
      industry: (doc as any).industry || "",
      teamSize: (doc as any).teamSize || "",
      workType: (doc as any).workType || "",
      companyName: (doc as any).companyName || "",
      websiteUrl: (doc as any).websiteUrl || "",
      completedAt: (doc as any).profilingCompletedAt || null,
    };
  } finally {
    await client.close();
  }
}

