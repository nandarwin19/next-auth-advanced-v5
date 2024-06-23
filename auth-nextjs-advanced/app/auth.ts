// import NextAuth from "next-auth";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [],
// });

import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
