import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { UserRole } from "@prisma/client";

// https://authjs.dev/getting-started/typescript
// declare module "@auth/core/types" {
//   interface Session {
//     user: {
//       id: string;
//       role: Role;
//     } & DefaultSession["user"];
//   }
// }

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
