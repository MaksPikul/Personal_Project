"use server"
import * as z from "zod"
import { db } from "@/lib/db"

import { UpdateTaskSchema } from "@/schemas"
import { Status, Task } from "@prisma/client"


export const UpdateTaskStatus= async (taskToEdit: Task, newStatus: Status) => {
    let task;

    try{
         task = await db.task.update({
            where: {
                id: taskToEdit.id,
                listId: taskToEdit.listId
            },
            data: {
                status: newStatus,
                updatedAt: new Date(Date.now())
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


