"use server"

import { createProjectSchema } from "@/schemas"
import { db } from "@/lib/db"
import * as z from "zod"
import {v4 as uuidv4} from "uuid"
import { auth} from '@/auth'
import { MemberRole, ViewType } from "@prisma/client"
 
export const CreateProject = async (values: z.infer<typeof createProjectSchema>) => {
    const session = await auth()
    
    const validatedFields = createProjectSchema.safeParse(values);

    if (!validatedFields.success){
        return { error: "Invalid fields"}
    }

    if (! session?.user?.id) {
        return null;
    }

    const {name, imageUrl} = validatedFields.data

    const newId = uuidv4()

    await db.project.create({
        data: {
            id: newId,
            userId: session?.user?.id,
            name,
            inviteCode: uuidv4(),
            imageUrl: imageUrl,
            views:{
                create:[
                    {type: ViewType.TABLE, userId: session?.user?.id,},
                    {type: ViewType.KANBAN, userId: session?.user?.id,},
                    {type: ViewType.NOTEPAD, userId: session?.user?.id,},
                    {type: ViewType.ROADMAP, userId: session?.user?.id,}
                ]
            },
            members: {
                create:[
                    {
                        role: MemberRole.ADMIN,
                        userId: session?.user?.id 
                    }
                ]
            },
            
        }
    })


    return {boardId:newId , success:"Board Created"}
}