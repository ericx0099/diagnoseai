import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
const JWT_SECRET = process.env.NEXT_PRIVATE_JWT_SECRET!;
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PRIVATE_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PRIVATE_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
        secure: true,
        maxAge: 3600 * 12,
      },
    },
  },
  secret: JWT_SECRET,
};
export default NextAuth(authOptions);
