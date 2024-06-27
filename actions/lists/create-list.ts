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


export const createList = async (values: z.infer<typeof CreateListSchema>) => {
    const validatedFields = CreateListSchema.safeParse(values);
    const { projectId, title} = validatedFields?.data
    let list;
    
    
    try{
        const project = await db.project.findUnique({
            where: {
                id: projectId
            }
        })
        if (!project) {
            return {
                error: "Project not found"
            }
        }
        const lastList = await db.list.findFirst({
            where: { projectId: projectId},
            orderBy: {order: "desc"},
            select: {order: true}
        })
        const newOrder = lastList ? lastList.order + 1 : 1;

        list = await db.list.create({
            data: {
                title: title ? title : "New List!",
                projectId: projectId,
                order: newOrder
            }
        })
    }
    catch (error) {
        return {
            error: "Failed to create"
        }
    }
    
    return {success: list}
}