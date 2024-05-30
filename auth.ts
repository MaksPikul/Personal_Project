import NextAuth from "next-auth"
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from '@/auth.config'
import { db } from "./lib/db"
import { getUserByID } from "./data/user"
import { getTwoFactorConfirmationByUserId } from "./data/2fa-confirmation"

export const { 
  handlers: {GET, POST}, 
  auth,
  signIn,
  signOut, 
} = NextAuth({
  pages:{
    signIn: "auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({user}) {
      await db.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    async jwt({token}){
      if (!token.sub) return token;
      
      return token
    },
    async session({token, session}) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async signIn({user, account}) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserByID(user?.id)

      if (!existingUser?.emailVerified) {return false}

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await 
        getTwoFactorConfirmationByUserId(existingUser.id)

        if (!twoFactorConfirmation) {return false}

        await db.twoFactorConfirmation.delete({
          where: {id : twoFactorConfirmation.id}
        })
      }

      return true
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt"},
  ...authConfig,
})