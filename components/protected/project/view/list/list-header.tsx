
import { List, Task } from "@prisma/client"

import { ChevronDown } from "lucide-react"



import { DeleteListButton } from "./delete-list"
import { EditListTitle } from "./edit-list-title";
import { useTransition } from "react"

import { CreateTask } from "@/actions/create-task"
import { useRouter } from "next/navigation"
import { CreateTaskButton } from "../task/create-task-button"
import { ListWithCards } from "@/types"
import { Dispatch, SetStateAction } from "react";


interface ListHeaderProps {
    data: ListWithCards;
    addOptimisticTask: (action: Task) => void
    collapsed: boolean
    setCollapsed: Dispatch<SetStateAction<boolean>>
    
}

export const ListHeader = ({
    data,
    addOptimisticTask,
    collapsed,
    setCollapsed,
    
}:ListHeaderProps) => {

    

    return (
        <div className=" bg-blue-700 flex flex-row items-center">

            <button
            onClick={()=>setCollapsed(!collapsed)}>
                <ChevronDown />
            </button>


            <CreateTaskButton list={data as ListWithCards} addOptimisticTask={addOptimisticTask} />
            
            <EditListTitle data={data}/>

            <DeleteListButton list={data as ListWithCards}/>

            <p>{data.tasks.length} Tasks </p>
        </div>
    )
}