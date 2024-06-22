"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { List } from "@prisma/client"

export const DeleteList = async (list : List) => {
    const session = await auth()

    if (!session?.user){
        return {error: "No user found"}
    }
    if (!list.id) {
        return {error: "No List to delete"}
    }
    
    try{
        await db.list.delete({
            where:{
                id: list.id,
            },
        })
    }
    catch (error){
        return {error: "Could not delete project"}
    }
}