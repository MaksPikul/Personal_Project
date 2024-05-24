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

    const {name, imageUrl} = validatedFields.data

    await db.board.create({
        data: {
            userId: session?.user?.id,
            name,
            imgUrl: "empty for now",
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

    return { success: "Board Created"}
}