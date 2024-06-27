"use server"
import * as z from "zod"
import { db } from "@/lib/db"

import { UpdateDescSchema, UpdateTaskSchema } from "@/schemas"
import { Member, Task, Urgency } from "@prisma/client"




export const UpdateTask = async (values: z.infer<typeof UpdateTaskSchema>) => {
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


export const UpdateTaskUrgency = async (taskToEdit: Task, newUrgency: Urgency) => {
    let task;

    try{
         task = await db.task.update({
            where: {
                id: taskToEdit.id,
                listId: taskToEdit.listId
            },
            data: {
                urgency: newUrgency,
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

export const UpdateTaskDate = async (taskToEdit: Task, newDate: any) => {
    let task;
    try{
         task = await db.task.update({
            where: {
                id: taskToEdit.id,
                listId: taskToEdit.listId
            },
            data: {
                due: newDate,
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

export const UpdateTaskDesc= async (values: z.infer<typeof UpdateDescSchema>) => {
    const validatedFields = UpdateDescSchema.safeParse(values);
    const { desc, id, listId} = validatedFields?.data
    let task;
    try{
        task = await db.task.update({
            where: {
                id,
                listId
            },
            data: {
                description:desc,
            }
        })
    }
    catch (error) {
        return {error: "Could not update."}
    }
    return {success: task, message:"Note successfully saved"}
}

export const UpdateTaskMember = async (taskToEdit:Task, member:Member) => {
    let task;
    try{
        task = await db.task.update({
            where: {
                id:taskToEdit.id,
                listId:taskToEdit.listId
            },
            data: {
                allocatedTo:member,
                isAllocated:true
            }
        })
    }
    catch (error) {
        return {error: "Could not update."}
    }
    return {success: task, message:"Note successfully saved"}
}