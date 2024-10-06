import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";


const authorize = async (credentials) => {
    await connectDB(); // Ensure the database connection is established
  
    // Find the user by email
    const user = await User.findOne({
      email: credentials?.email,
    }).select("+password");
  
    // Check if user exists
    if (!user) throw new Error("Wrong Email");
  
    // Compare the password
    const passwordMatch = await bcrypt.compare(credentials.password, user.password);
  
    // Check if password matches
    if (!passwordMatch) throw new Error("Wrong Password");
  
    // Return the user object if authentication is successful
    console.log("signing in");
    return user;
  };

export const authOptions  = {
    providers: [
      credentials({
        name: "Credentials",
        id: "credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        //async authorize(credentials) {},
        authorize,
      }),
    ],
    session: {
      strategy: "jwt",
    }
  };