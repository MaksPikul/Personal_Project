"use server"
import * as z from "zod"
import { db } from "@/lib/db"

import { UpdateTaskSchema } from "@/schemas"


export const UpdateTask= async (values: z.infer<typeof UpdateTaskSchema>) => {
    const validatedFields = UpdateTaskSchema.safeParse(values);
    const { title, id, listId} = validatedFields?.data
    let task;
    
    
    try{
        task = await db.task.update({
            where: {
                id,
                listId
            },
            data: {
                title,
            }
        })
    }
    catch (error) {
        return {
            error: "Failed to update task"
        }
    }
    
    return {success: task}
}