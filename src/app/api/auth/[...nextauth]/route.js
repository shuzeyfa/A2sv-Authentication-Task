// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const url = "https://akil-backend.onrender.com/login";
          const result = await axios.post(
            url,
            {
              email: credentials?.email,
              password: String(credentials?.password),
            },
            { headers: { "Content-Type": "application/json" } }
          );

          // ✅ Ensure you return only user object
          if (result.data?.success && result.data.data) {
            return {
              id: result.data.data.id,
              name: result.data.data.name,
              email: result.data.data.email,
              accessToken: result.data.token || result.data.data.token, // adjust based on backend response
            };
          }
          return null;
        } catch (error) {
          console.error("Auth failed", error?.response?.data || error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          // ✅ Try login first
          await axios.post(`https://akil-backend.onrender.com/login`, {
            email: user.email,
            password: user.email, // fake password, depends on your backend design
          });
        } catch (err) {
          if (err.response?.status === 404) {
            // user not found → signup
            try {
              await axios.post(`https://akil-backend.onrender.com/signup`, {
                name: user.name,
                email: user.email,
                password: crypto.randomUUID(),
                confirmPassword: crypto.randomUUID(),
              });
            } catch (signupErr) {
              console.error("Google signup error:", signupErr?.response?.data);
              return false;
            }
          } else if (err.response?.status !== 409) {
            console.error("Google sign-in error:", err?.response?.data);
            return false;
          }
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.accessToken = token.accessToken;
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
