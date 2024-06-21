"use client"

import { KeyboardEventHandler, forwardRef } from "react";

interface TaskInputProps {
    id: string;
    label?: string;
    placeholder?: string
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    onBlur?: ()=> void;
    onClick: ()=> void;
    onKeyDown? : KeyboardEventHandler<HTMLInputElement> | undefined
}

export const TaskInput = forwardRef <HTMLInputElement, TaskInputProps>(({
    id,
    label,
    placeholder,
    required, 
    boolean,
    disabled,
    errors,
    className,
    onBlur,
    onClick,
    onKeyDown,
},ref) => {

    return(
        <div>
            <div>
                
            </div>
        </div>
    )
})

TaskInput.displayName = "TaskInput"