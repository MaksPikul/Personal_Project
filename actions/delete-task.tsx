"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { List, Task } from "@prisma/client"

export const DeleteTask = async (task : Task) => {
    const session = await auth()

    if (!session?.user){
        return {error: "No user found"}
    }
    if (!task.id) {
        return {error: "No List to delete"}
    }
    
    try{
        await db.task.delete({
            where:{
                id: task.id,
            },
        })
    }
    catch (error){
        return {error: "Could not delete project"}
    }
}