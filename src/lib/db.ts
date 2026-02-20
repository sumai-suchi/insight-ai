import mongoose from "mongoose";

// Get MongoDB URI from environment variable
const getMongoDBUri = (): string => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === "") {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env",
    );
  }

  const trimmedUri = uri.trim();

  // Validate URI format
  if (
    !trimmedUri.startsWith("mongodb://") &&
    !trimmedUri.startsWith("mongodb+srv://")
  ) {
    throw new Error(
      `Invalid MongoDB URI format. Expected connection string to start with "mongodb://" or "mongodb+srv://". Got: ${trimmedUri.substring(0, 30)}...`,
    );
  }

  // Append appName query parameter if not already present
  // Check if URI already has query parameters
  const hasQueryParams = trimmedUri.includes("?");
  const hasAppName = trimmedUri.includes("appName=");

  if (!hasAppName) {
    const separator = hasQueryParams ? "&" : "?";
    return `${trimmedUri}${separator}appName=SynapseNews`;
  }

  return trimmedUri;
};

const MONGODB_URI = getMongoDBUri();

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env",
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
