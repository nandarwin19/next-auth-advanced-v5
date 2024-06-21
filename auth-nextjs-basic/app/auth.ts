import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { compare } from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials || {};

        if (!email || !password) {
          throw new Error("Please provide email and password");
        }

        await connectDB();
        const user = await User.findOne({ email });
        if (
          !user ||
          !user.password ||
          !(await compare(password, user.password))
        ) {
          throw new Error("Invalid email or password");
        }

        const { _id, firstname, lastname, role } = user;
        return { id: _id, firstname, lastname, email, role };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        await connectDB();
        const alreadyUser = await User.findOne({ email: user.email });

        if (!alreadyUser) {
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            authProviderId: user.id,
          });
        }
      }
      return true;
    },
  },
});
