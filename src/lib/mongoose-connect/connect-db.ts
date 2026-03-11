import mongoose from "mongoose";

const MONGO_URI : string = process.env.BETTER_AUTH_MONGODB_URI!;

if (!MONGO_URI) throw new Error("BETTER_AUTH_MONGODB_URI not defined");

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectMongo() {
  if (cached.conn) {
    // Reuse existing connection
    console.log("MongoDB connected");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectMongo;