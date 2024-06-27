"use server"
import * as z from "zod"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens"
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail"
import { getTwoFactorTokenByEmail } from "@/data/2fa-token"
import { db } from "@/lib/db"
import { getTwoFactorConfirmationByUserId } from "@/data/2fa-confirmation"
import { CreateListSchema } from "@/schemas"
import { List } from "@prisma/client"


export const UpdateListOrder = async (items: any, projectId: string, ) => {
    
    let lists;
    
    
    try{
        const transaction = items.map((list)=>
            db.list.update({
                where:{
                    id: list.id,
                },
                data:{
                    order: list.order
                }
            }))

        lists = await db.$transaction(transaction)
    }
    catch (error) {
        return {
            error: "Failed to create"
        }
    }
    
    return {success: lists}
}