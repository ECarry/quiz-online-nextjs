import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
// import Google from "@auth/core/providers/google";

export default {
  providers: [
    GitHub({
      // profile(profile) {
      //   console.log("Profile GitHub", profile);

      //   return {
      //     ...profile,
      //     id: profile.id.toString(),
      //     role: "USER",
      //   };
      // },
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
} satisfies NextAuthConfig;
