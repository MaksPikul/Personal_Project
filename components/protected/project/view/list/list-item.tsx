"use client"

import { ListWithCards } from "@/types"
import { ListHeader } from "./list-header"
import { useState , useEffect , useOptimistic } from "react"
import { TaskItem } from "../task/task-item"
import { List, Task } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Columns } from "./columns"


interface ListItemProps {
    index: number
    list: ListWithCards
    
}

export const ListItem = ({
    index,
    list,
}:ListItemProps) => {
    const router = useRouter()
    const [collapsed, setCollapsed] = useState(false)
   
    const {tasks = []} = list


    
    const [optimisticTasks, addOptimisticTask] = useOptimistic(
        tasks,
        (state, newTask: Task) =>{
            return[...state, newTask]
        }
    )



    return (
        <li className="bg-green-600 ">
            <ListHeader
            data={list}
            addOptimisticTask={addOptimisticTask}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            />
            
            <Columns />

            {collapsed ? 
            <div>
                hidden
            </div>
            :
            <div>
            {optimisticTasks.map((task , index)=>{
            return(
                <TaskItem 
                task={task}
                index={index}
                />
            )})}
            </div>
            }

            <div> add task </div>
        </li>
    )
}