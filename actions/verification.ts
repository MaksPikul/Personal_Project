"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

export const Verification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);
    console.log("goes here")

    if (!existingToken) {
        return { error: "Token does not exist"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {error: "Token has expired"}
    }

    const existingUser = await getUserByEmail(existingToken.email)
    if (!existingUser) {
        return {error: "Email does not exist"}
    }

    await db.user.update({
        where: {id : existingUser.id},
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })
    




    /*

    When doing sign in from verification, 
    Make it wait a bit to show information (confirmed email) then route,
    password will need to be the literal string not hash
    try {
        const email = "mmaks522@gmail.com"
        const password = "123456"
        await signIn("credentials", {
            email, 
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    }
    catch (error){
        if (error instanceof AuthError){
            switch (error.type){
                case "CredentialsSignin":
                    return { error: "Invalid credentials"}
                default:
                    return {error: "Something went Wrong"}
            }
        }

        throw error;
    }
    */

   return {success: "Email verified"}
}