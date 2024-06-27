"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { DeleteProjectSchema } from "@/schemas"
import { Project } from "@prisma/client"
import * as z from "zod"

export const DeleteProject = async (project: Project | undefined, values: z.infer<typeof DeleteProjectSchema>) => {
    const validatedFields = DeleteProjectSchema.safeParse(values);

    if (!validatedFields.success){
        return { error: "Invalid fields"}
    }

    const session = await auth()
    const { name } = validatedFields.data

    if (!session?.user){
        return {error: "No user found"}
    }
    if (!project) {
        return {error: "No project to delete"}
    }
    if (name !== project.name) {
        return {error: "Project name does not match"}
    }

    try{
        await db.project.delete({
            where:{
                id: project.id,
                userId: session.user.id
            },
        })
    }
    catch (error){
        return {error: "Could not delete project"}
    }
}
