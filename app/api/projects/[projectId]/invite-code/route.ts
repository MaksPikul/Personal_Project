

import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import {v4 as uuidv4} from "uuid"



//Could have been done as a server action(not needing axios or NextReq & NextReq)
//However i wanted to try this out for learning purposes, 
//its basically the same thing with this method requiring a path 
export async function PATCH(
    req: Request,
    {params}: {params: {projectId: string}}
) {
    try{
        const session = await auth()
        const user = session?.user
        if (!user){
            return new NextResponse("Unauthoriszed", {status:401})
        }
        if (!params.projectId) {
            return new NextResponse("Project ID Missing", {status: 400})
        }

        const project = await db.project.update({
            where:{
                id: params.projectId,
                userId: user.id
            },
            data:{
                inviteCode: uuidv4()
            }
        })
        return NextResponse.json(project)
    }
    catch (error){
        console.log("[SERVER_ID]", error)
        return new NextResponse("internal Error",{ status: 500})
    }
}