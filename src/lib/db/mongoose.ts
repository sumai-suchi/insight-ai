// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI!;

// if (!MONGODB_URI) throw new Error("Please define MONGODB_URI in .env.local");

// // Global cache to prevent reconnecting on every hot-reload
// const globalWithMongoose = global as typeof globalThis & {
//   mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
// };

// if (!globalWithMongoose.mongoose) {
//   globalWithMongoose.mongoose = { conn: null, promise: null };
// }

// const cached = globalWithMongoose.mongoose;

// export async function connectDB(): Promise<typeof mongoose> {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       dbName: "newsdb",
//       bufferCommands: false,
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }