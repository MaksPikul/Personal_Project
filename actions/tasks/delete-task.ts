"use server"

import { auth } from "@/auth"
import { TaskCols } from "@/components/table/columns"
import { db } from "@/lib/db"
import { List, Task } from "@prisma/client"
import { Row } from "react-day-picker"

export const DeleteTask = async (task : Task[]) => {
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

export const DeleteManyTasks = async (taskIds : string[]) => {
    const session = await auth()

    if (!session?.user){
        return {error: "No user found"}
    }
   
    try{
        await db.task.deleteMany({
            where:{
                id: {in: taskIds}
            },
        })
    }
    catch (error){
        return {error: "Could not delete project"}
    }
}