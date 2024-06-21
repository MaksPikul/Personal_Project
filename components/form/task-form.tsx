"use client"

import { forwardRef } from "react";

interface TaskFormProps {
    listId: string;
    enableEditing: ()=> void
    disableEditing: ()=> void
    isEditing: boolean
}

export const TaskForm = forwardRef<HTMLInputElement, TaskFormProps>(({
    listId,
    enableEditing,
    disableEditing,
    isEditing,  
}, ref) =>{

    return (
        <div>
            form
        </div>
    )
})

TaskForm.displayName = "TaskForm"