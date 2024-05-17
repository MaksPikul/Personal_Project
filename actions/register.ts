"use server"

import { RegisterSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import * as z from "zod"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export const Register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success){
        return { error: "Invalid fields"}
    }

    const {name, email, password} = validatedFields.data;
    const hashedPass = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email)
    
    if (existingUser){
        return {error: "Email already taken"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPass,
        }
    })

    //send verification email
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email, 
        verificationToken.token)

    
    return { success: "Email sent"}
}