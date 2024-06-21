"use server"

import { db } from "@/lib/db"

export const CreateTask = async (listId: string) => {

    try{
        const lastList = await db.task.findFirst({
            where: { listId: listId},
            orderBy: {order: "desc"},
            select: {order: true}
        })
        const newOrder = lastList ? lastList.order + 1 : 1;

        const task = await db.task.create({
            data: {
                title: "New Task!",
                listId,
                order: newOrder,
                description: ""
            }
        })
        return task
    }
    catch {
        return {error: "Failed to create Task"}
    }
}