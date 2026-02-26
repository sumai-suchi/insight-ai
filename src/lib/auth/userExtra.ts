// lib/auth/userExtra.ts
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URI!);
await client.connect();
const db = client.db("Better_Auth");
export const userExtraCollection = db.collection("userExtra");

export async function getUserExtra(userId: string) {
  return await userExtraCollection.findOne({ userId });
}

export async function createUserExtra(userId: string) {
  return await userExtraCollection.insertOne({
    userId,
    failedAttempts: 0,
    lockUntil: null,
  });
}

export async function incrementFailedAttempts(userId: string, lockMinutes = 15) {
  const now = new Date();
  const userExtra = await getUserExtra(userId);

  if (!userExtra) {
    await createUserExtra(userId);
    return incrementFailedAttempts(userId, lockMinutes);
  }

 const failedAttempts = (userExtra.failedAttempts || 0) + 1;

  let update: any = {
    $inc: { failedAttempts: 1 },
  };

  if (userExtra?.lockUntil && new Date(userExtra?.lockUntil) > new Date()) {
 return NextResponse.json(
  { 
    error: "Account temporarily locked", 
    lockUntil: userExtra.lockUntil // ISO string 
  }, 
  { status: 403 }
);
}


  if (failedAttempts >= 5) {
    update.$set = {
      lockUntil: new Date(now.getTime() + lockMinutes * 60 * 1000),
    };
  }

  return await userExtraCollection.updateOne({ userId }, update);
}

export async function resetFailedAttempts(userId: string) {
  return await userExtraCollection.updateOne(
    { userId },
    { $set: { failedAttempts: 0, lockUntil: null } }
  );
}