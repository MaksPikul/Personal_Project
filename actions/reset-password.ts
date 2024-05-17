"use server"

import { ResetSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"
import { generatePasswordResetToken } from "@/lib/tokens"
import { sendPasswordResetEmail } from "@/lib/mail"

import * as z from "zod"


export const Reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Invalid email"}
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email)

    if (!existingUser) {
        return {error: "Email not found"}
    }

    //generate token and reset
    const passwordResetToken = await generatePasswordResetToken(existingUser.email)

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token
    )

    return {success: "Reset email sent"}
}