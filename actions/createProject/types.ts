import * as z from "zod"
import { Project } from "@prisma/client"

import { ActionState } from "@/lib/create-safe-action"
import { createProjectSchema } from "./schema"

export type InputType = z.infer<typeof createProjectSchema>;
export type ReturnType = ActionState<InputType, Project>