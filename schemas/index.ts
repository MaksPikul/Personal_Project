import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
    pin: z.optional(z.string()),
})

export const RegisterSchema = z.object({
    name: z.string().min(3,{
        message: "Minimum name length - 3 characters"
    }).max(20,{
        message: "Maximum name length - 20 characters"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum password length - 6 characters"
    }),
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
})

export const DeleteProjectSchema = z.object({
    name: z.string()
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6,{
        message: "Minimum password length - 6 characters"
    }),
})



export const SettingsSchema = z.object({
    //alias: z.optional(z.string())
    name: z.optional(z.string()),
    email: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6))
}).refine((data) => {
    if (data.password && !data.newPassword){
        return false
    }
    return true
},{
    message: "New password is required",
    path: ["newPassword"]
}).refine((data) => {
    if (!data.password && data.newPassword){
        return false
    }
    return true
},{
    message: "Password is required",
    path: ["password"]
})

export const CreateListSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required"
    }),
    projectId: z.string()
})

export const UpdateListSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required"
    }).min(3,{
        message: "Minimum title length - 3 characters"
    }),
    id: z.string(),
    projectId: z.string()
})


// will need checkboxs, description and column row options

export const UpdateTaskSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required"
    }).min(3,{
        message: "Minimum title length - 3 characters"
    }),
    id: z.string(),
    listId: z.string()
})

export const UpdateDescSchema = z.object({
    desc: z.string(),
    id: z.string(),
    listId: z.string()
})

