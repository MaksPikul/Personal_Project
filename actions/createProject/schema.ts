import * as z from "zod"

export const createProjectSchema = z.object({
    name: z.string({
    }).min(3,{
        message: "Project name too short"
    }).max(30,{
        message: "Maximum name length - 30 characters"
    }),
    imageUrl: z.optional(z.string())
})