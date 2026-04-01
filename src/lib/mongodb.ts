import mongoose from "mongoose";

const MONGODB_URI = process.env.BETTER_AUTH_MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the BETTER_AUTH_MONGODB_URI environment variable");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
