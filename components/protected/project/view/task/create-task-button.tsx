
import { Button } from "@/components/ui/button"
import { useTransition, useOptimistic, useRef} from "react"
 
import { CreateTask } from "@/actions/tasks/create-task"
import { useRouter } from "next/navigation"
import { List, Task } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { ListWithCards } from "@/types";
import { v4 as uuidV4 } from "uuid";

interface CreateTaskButtonProps {
    list: ListWithCards
    
    
}

export const CreateTaskButton = ({
    list,
    
}:CreateTaskButtonProps) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()


    const formRef = useRef();
  
    


    const onClick = (formData:string) => {
            startTransition(()=>{
                
                
                

                CreateTask(list.id)
                .then((data) =>{
                    if (data.error){
                        console.log("error lol")
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
        <form 
        action={onClick} 
        ref={formRef}>
            <input 
            hidden 
            type="text" 
            name="task"
            value="New Task!"/>
                <Button
                type="submit"
                className="text-white"
                disabled={isPending}>
                    Add Task
                </Button>
        </form>

    )
}