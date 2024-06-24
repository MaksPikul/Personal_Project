"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const CreateTask = async (listId: string) => {
    const session = await auth()

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
                description: "",
                urgency: "LOW",
                assignee: session?.user.name,
                userId: session?.user.id,
                isAllocated: false,
                status: "PENDING"
            }
        })
        return task
    }
    catch (error) {
        console.log(error)
        return {error: "Failed to create Task"
        }
    }
}