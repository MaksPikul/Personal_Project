"use client"

import { useTransition, useState} from "react";
import { X, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { DeleteTask } from "@/actions/delete-task";
import { Task } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
import { Dispatch, SetStateAction } from "react";

interface DeleteTaskButtonProps {
    task: Task;
    
}

export const DeleteTaskButton = ({
    task,
   
}:DeleteTaskButtonProps) => {

    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [confirm, setConfirm] = useState(false)

    const { toast } = useToast()

    const onDeleteTask = (taskToDelete : Task) =>{

        //handleClientRemoveTask(taskToDelete)
        toast({
            title: `you deleted task ${task.title}`,
            action: <ToastAction altText="Undo?">Undo</ToastAction>
        })
        


        startTransition(()=>{
            DeleteTask(taskToDelete)
            .then((data) =>{
                if (data?.error){
                    //setError(data?.error)
                }
                else {
                    //disableTaskEditing();
                    setConfirm(false)
                    router.refresh()
                }
            })
        })
    }

    return (
        <>
        {!confirm ? 

            <button 
            className="bg-red-600 rounded-full size-6"
            onClick={()=>setConfirm(true)}>
                <X  />
            </button>
            :
            <>
                <button
                onClick={()=>onDeleteTask(task)}
                disabled={isPending}>
                    <Check />
                </button>

                <button 
                    onClick={()=>setConfirm(false)}>
                    <X />
                </button>
            </>
            }
        </>
    )
}