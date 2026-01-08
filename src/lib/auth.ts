import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectDB } from "@/lib/mongodb";
import { nextCookies } from "better-auth/next-js";

let auth: any;

async function initializeAuth() {
  const conn = await connectDB();
  // Get the MongoDB client from the Mongoose connection
  const client = conn.connection.getClient();
  
  auth = betterAuth({
    database: mongodbAdapter(client),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [nextCookies()],
  });
  
  return auth;
}

export { initializeAuth };