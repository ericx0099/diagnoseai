import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import { JWT, JWTEncodeParams } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { Account } from "next-auth";

enum SAMESITE {
  LAX= "lax"
}

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
        sameSite: SAMESITE.LAX,
        path: "/",
        secure: true,
        maxAge: 3600 * 12,
      },
    },
  },
  secret: JWT_SECRET!,
  jwt: {
    encryption: false,
    secret: JWT_SECRET!,
    decode: async ({ token }: { token?: string }) => {
      // Note the token is now optional
      if (!token) {
        // If token is not provided, return null or handle as needed
        return null;
      }
      try {
        const result = jwt.verify(token, JWT_SECRET) as JWT;
        return result;
      } catch (err) {
        return null;
      }
    },
    encode: async (params: JWTEncodeParams): Promise<string> => {
      if (!params.token) {
        throw new Error("Token not provided");
      }
      if (params.token.exp) {
        delete params.token.exp;
      }

      const _token = jwt.sign(params.token, JWT_SECRET, { expiresIn: "12h" });
      /*
			try {
				const url = `${BACKEND_URL}/auth/store-session`;
				await axios.post(url, { jwt: _token });
			} catch (err) {NEXT_PUBLIC_BACKEND_URL
				//console.log(err);
			}
      */
      return _token;
    },
    
  },

  callbacks: {
  /*  session({ session, token }: { session: any; token: any }) {
      return session;
    }, */
    async signIn(everything: { account: Account | null; user: any }) {
      if (everything?.account && everything?.account?.provider == "google") {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register-from-google`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Add any additional headers as needed
            },
            body: JSON.stringify(everything.user),
          }
        );
      }
      return true;
    },
    async jwt({token, account, profile}: any){
      if(account && profile){
        const email = token.email;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/get-user-language`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Add any additional headers as needed
            },
            body: JSON.stringify({email}),
          }
        );
        const r = await response.json()
        let lang = 'en';
        if(r && r.data){
          lang = r.data;
        }
        token.language = lang;
      }
      return token
    },
    async session({ session, token, user }: any) {
      // Add custom properties to the session
      if (token) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/get-user-language`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Add any additional headers as needed
            },
            body: JSON.stringify({email:session.user.email}),
          }
        );
        const r = await response.json()
        let lang = 'en';
        if(r && r.data){
          lang = r.data;
        }
        session.user.language = lang;

      }
      return session;
    },
  },
};
export default NextAuth(authOptions);
