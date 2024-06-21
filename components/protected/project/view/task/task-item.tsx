"use client"

import { Task } from "@prisma/client"

import { useOptimistic, useState, } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { StickyNoteIcon } from "lucide-react";

import { EditTaskForm } from "./edit-task-form";
import { DeleteTaskButton } from "./delete-task-button";



interface TaskItemProps {
    task: Task;
    index: number;
    
}

export const TaskItem = ({
    task,
    index,
}:TaskItemProps) => {
    const [isEditingTask, setIsEditingTask] = useState([false,0])
    
    const enableTaskEditing = (order:number) => {
        setIsEditingTask([true,order])
    }
    const disableTaskEditing = () => {
        setIsEditingTask([false,0])
        
        console.log("reddit")
    }

    const [optimisticTitle, setOptimisticTitle] = useOptimistic(
        task.title,
        (state, newTitle: string) =>{
            return newTitle
        }
    )
    
    //CheckBox , TaskItem , More info | columns
    return (
        <div className="flex flex-row">

            {/*Mark as Done*/}
            <Checkbox />

            {/* Task Title and editing */}
            {isEditingTask[0] && isEditingTask[1]===index+1? 
                <EditTaskForm 
                task={task}
                disableTaskEditing={disableTaskEditing}
                setOptimisticTitle={setOptimisticTitle}
                />
                :
                <button 
                className="h-8 items-center text-lg flex hover:border rounded-md px-3"
                onClick={()=>enableTaskEditing(task.order)}>
                    {optimisticTitle}
                </button>
            }

            {/* More detail modal */}
            <StickyNoteIcon />


            <DeleteTaskButton task={task as Task} />

        </div>
    )
}