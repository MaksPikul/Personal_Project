"use server"

import { db } from "@/lib/db"
import { InputType, ReturnType } from "./types"
import { auth} from '@/auth'
import {v4 as uuidv4} from "uuid"
import { MemberRole } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { createProjectSchema } from "./schema"

const handler = async (data: InputType): Promise<ReturnType> => {

    const session = await auth()

    if (! session?.user?.id) {
        return {
            error: "Unauthorized"
        }
    }
    //, deadline
    const { name, imageUrl } = data
    let project;

    try {
        project = await db.project.create({
            data: {
                userId: session?.user?.id,
                name,
                inviteCode: uuidv4(),
                imageUrl: imageUrl,
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
    }
    catch {
        return { 
            error: "Failed to create"
        }
    }

    revalidatePath(`/board/${project.id}`)
    return {data: project}
}

export const createProject = createSafeAction(createProjectSchema , handler)






















/*

import * as z from "zod"

import { MemberRole, ViewType } from "@prisma/client"
 
export const CreateProject = async (values: z.infer<typeof createProjectSchema>) => {
   

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
}*/