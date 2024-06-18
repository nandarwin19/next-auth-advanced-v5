"use server";

import connectDB from "@/lib/db";
import { User } from "@/models/User";
import { redirect } from "next/navigation";

const register = async (formData: FormData) => {
  const firstName = formData.get("firstname") as string;
  const lastName = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!firstName || !lastName || !email || !password) {
    return { error: "Please fill out all fields" };
  }

  await connectDB();

  // existing user

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  await User.create({ firstName, lastName, email, password });
  console.log("User created");
  redirect("/login");
};

export { register };
