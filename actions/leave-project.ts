"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"

export const LeaveProject = async (projectId: string | undefined) => {
    const session = await auth()

    if (!session?.user) {
        return {error: "No user found"}
    }
    if (!projectId){
        return {error: "No project Id parameter"}
    }

    try{
        await db.project.update({
            where:{
                id: projectId,
                userId: {
                    not: session.user.id
                },
                members: {
                    some: {
                        userId: session.user.id
                    }
                }
            },
            data: {
                members:{
                    deleteMany: {
                        userId: session.user.id
                    }
                }
            }
        })
    }
    catch (error){
        console.log(error)
    }
}