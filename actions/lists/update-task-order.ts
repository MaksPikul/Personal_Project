"use server"

import { db } from "@/lib/db"


export const UpdateTaskOrder = async (items: any, projectId: string ) => {
    
    let tasks;
    try{
        const transaction = items.map((task)=>{
            console.log(task)
            return(
            db.task.update({
                where:{
                    id: task.id,
                    list: {
                        project:{
                            id: projectId
                        }
                    }
                   
                },
                data:{
                    order: task.order,
                    //listId: task.listId
                }
            }))})

        
        console.log("here")
        tasks = await db.$transaction(transaction)
        console.log("here2")
    }
    catch (error) {
        console.log(error)
        return {
            error: "Failed to create"
        }
    }
    
    return {success: tasks}
}