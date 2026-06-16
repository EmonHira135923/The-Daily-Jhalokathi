import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { getUsers } from "@/app/(Backend)/lib/dbConnect";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET_KEY,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "github") {
        const { name, email, image } = user;
        try {
          const userCollection = await getUsers();
          const userExist = await userCollection.findOne({ email });

          if (!userExist) {
            await userCollection.insertOne({
              name,
              email,
              image,
              phone: "",
              role: "user",
              provider: account.provider,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          } else {
            await userCollection.updateOne(
              { email },
              {
                $set: {
                  provider: account.provider,
                  updatedAt: new Date(),
                },
              },
            );
          }
          return true;
        } catch (error) {
          return false;
        }
      }
      return true;
    },

    // 💡 ম্যাজিক পার্ট: এই কলব্যাকের ভেতর আমরা কাস্টম টোকেন জেনারেট করে কুকিতে সেট করব
    async jwt({ token, user, account }) {
      if (user) {
        const userCollection = await getUsers();
        const dbUser = await userCollection.findOne({ email: user.email });

        if (dbUser) {
          // ১. আপনার কাস্টম প্রোফাইল এপিআই-এর পেলোডের সাথে মিল রেখে ডাটা সাজানো
          const customPayload = {
            _id: dbUser._id.toString(),
            email: dbUser.email,
            role: dbUser.role,
          };

          // ২. আপনার কাস্টম মেথডের মতোই jwt.sign করা
          const customAccessToken = jwt.sign(
            customPayload,
            process.env.NEXTAUTH_SECRET, // আপনার কাস্টম প্রোফাইল এপিআই এই সিক্রেটটিই ভেরিফাই করছে
            { expiresIn: "15m" },
          );

          // ৩. গুগলে সাকসেস হওয়ার সাথে সাথে 'accessToken' নামের কুকিতে ভ্যালু পুশ করা
          const cookieStore = await cookies();
          cookieStore.set("accessToken", customAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 15 * 60,
          });

          // NextAuth এর নিজস্ব টোকেন স্ট্রাকচারও ঠিক রাখা হলো
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
