"use server"

import { db } from "@/lib/db"

/* 
Might not need since tokens are now cached
Too afraid to delete these files for now

export const getVerificationTokenByEmail = async (
    email: string
) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: { email }
        })
        return verificationToken
    }
    catch  {
        return null
    }
}

export const getVerificationTokenByToken = async (
    token: string
) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: { token }
        })
        return verificationToken
    }
    catch  {
        return null
    }
}
*/