"use server"

import { createBoardSchema } from "@/schemas"
import { db } from "@/lib/db"
import * as z from "zod"
import {v4 as uuidv4} from "uuid"
import { auth} from '@/auth'
import { MemberRole } from "@prisma/client"
 
export const CreateBoard = async (values: z.infer<typeof createBoardSchema>) => {
    const session = await auth()
    
    const validatedFields = createBoardSchema.safeParse(values);

    if (!validatedFields.success){
        return { error: "Invalid fields"}
    }

    if (! session?.user?.id) {
        return null;
    }

    const {name, imgUrl} = validatedFields.data

    const newId = uuidv4();

    await db.board.create({
        data: {
            id: newId,
            userId: session?.user?.id,
            name,
            imgUrl: imgUrl,
            projects: {
                create:[
                    {name: "First Project!", 
                    userId: session?.user?.id ,
                    members: {
                        create:[
                            {
                                role: MemberRole.ADMIN,
                                userId: session?.user?.id 
                            }
                        ]
                    }
                },
                ]
            }
        }
    })


    return {boardId:newId , success:"Board Created"}
}