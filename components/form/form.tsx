"use client"

import { forwardRef } from "react";
import { useFormState } from "react-dom";

interface TaskFormProps {
    listId: string;
    enableEditing: ()=> void
    disableEditing: ()=> void
    isEditing: boolean
}

export const Form = forwardRef<HTMLInputElement, TaskFormProps>(({
    listId,
    enableEditing,
    disableEditing,
    isEditing,  
}, ref) =>{
    const initialState = {message: null, errors: {}}
    const [state, dispatch] = useFormState(create, initialState)

    return (
        <form action={dispatch}>
            <div>

            {state?.errors?.}
            </div>
        </form>
    )
})

TaskForm.displayName = "TaskForm"