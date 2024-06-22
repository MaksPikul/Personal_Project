"use server"
import * as z from "zod"
import { db } from "@/lib/db"

import { UpdateListSchema } from "@/schemas"


export const UpdateList = async (values: z.infer<typeof UpdateListSchema>) => {
    const validatedFields = UpdateTaskSchema.safeParse(values);
    const { title, id, projectId} = validatedFields?.data
    let list;
    
    console.log(projectId)
    try{
        list = await db.list.update({
            where: {
                id,
                projectId
            },
            data: {
                title,
            }
        })
    }
    catch (error) {
        return {
            error: "Failed to update"
        }
    }
    
    return {success: list}
}