
import { Button } from "@/components/ui/button"
import { useTransition, useOptimistic, useRef} from "react"
 
import { CreateTask } from "@/actions/tasks/create-task"
import { useRouter } from "next/navigation"
import { List, Task } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { ListWithCards } from "@/types";
import { v4 as uuidV4 } from "uuid";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface CreateTaskButtonProps {
    list: ListWithCards,
    roles: {
        isAdmin:boolean,
        isMod:boolean
    }
}

export const CreateTaskButton = ({
    list,
    roles
}:CreateTaskButtonProps) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()


    const formRef = useRef();
  
    


    const onClick = (formData:string) => {
            startTransition(()=>{
                CreateTask(list.id)
                .then((data) =>{
                    if (data.error){
                        console.log(data.error)
                    }
                    else {
                        router.refresh()
                    }
                })
            })
    }

    const newData = {
        id: uuidV4(),
        title: "New Task!",
        listId: list.id,
        order: list.tasks.length,
        description: "",
        updatedAt: new Date(Date.now()),
        createdAt: new Date(Date.now())
    }
    
    return (
        <Tooltip>
            
                <form 
                action={onClick} 
                ref={formRef}>
                    <input 
                    hidden 
                    type="text" 
                    name="task"
                    value="New Task!"/>
                    <TooltipTrigger asChild>
                        <Button
                        variant="ghost"
                        type="submit"
                        className={` text-white`}
                        disabled={isPending || !(roles?.isMod)}>
                            Add Task
                        </Button> 
                    </TooltipTrigger>
                </form>
           
            
            {(roles?.isMod) ?
            null
                :
                <TooltipContent>
            <p>Cannot create task as member</p>
                </TooltipContent>
            }
            
        </Tooltip>
        
        

    )
}