"use server";

import { db } from "@/lib/db";
import { getRedisClient } from "@/lib/redis"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export const Verification = async (token: string) => {

    const redisResult = await getRedisClient()
        .multi()
        .hgetall(token)
        .del(token)
        .exec()

        // no redis cache entry stored
    if (!redisResult || redisResult[0][0]){
        return {error: "Token does not exist or has expired"}
    }

    const cachedAccount = redisResult[0][1] as {
        name: string;
        email: string;
        password: string
    }

    if (!cachedAccount.name ||
        !cachedAccount.email ||
        !cachedAccount.password
    ) {
        return {error: "Cached account missing values to verify"}
    }

    console.log(cachedAccount)

    await db.user.create({
        data: {
            name : cachedAccount.name,
            email: cachedAccount.email,
            password: cachedAccount.password,
            emailVerified: new Date(),
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