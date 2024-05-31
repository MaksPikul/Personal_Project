"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"

import { db } from "@/lib/db"
import { SettingsSchema } from "@/schemas"
import { getUserByID } from "@/data/user"
import { currentUser } from "@/lib/user"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export const Settings = async (values: z.infer<typeof SettingsSchema>)=>{

    
    const user = await currentUser();
    if (!user) {
        return {error : "No user found"}
    }
    
    const dbUser = await getUserByID(user.id)
    if (!dbUser) {
        return {error: "No user found"}
    }

    if (user.isOAuth){
        values.email = undefined
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if (values.email && values.email !== user.email) {
        const existingUser = await getUserByEmail(values.email)
        if (existingUser) {
            return {error : "Email already taken"}
        }

        const verificationToken = await generateVerificationToken(values.email)
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token
        )

        return {success: "Verification Email Sent"}
    }

    if (values.password && values.newPassword && dbUser.password){
        const passwordMatching = await bcrypt.compare(
            values.password,
            dbUser.password
        )
        if (!passwordMatching) {
            return {error: "Incorrect password"}
        }
        const hashedPassword = await bcrypt.hash(
            values.newPassword,
            10
        )
        values.password = hashedPassword;
        values.newPassword = undefined;
    }


    
    await db.user.update({
        where: { id: dbUser.id},
        data: {
            ...values,
        }
    })

    return {success: "Settings updated"}

}