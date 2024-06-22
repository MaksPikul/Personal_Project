"use client"

import { ListWithCards } from "@/types"
import { ListHeader } from "./list-header"
import { useState , useEffect , useOptimistic } from "react"
import { TaskItem } from "../task/task-item"
import { List, Task } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Columns } from "./columns"

import { DataTable } from "@/components/table/data-table"
import { columns } from "@/components/table/columns"


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


    const taskData = [{
        id: "728ed52f",
        assignee: "maks",
        status: "pending",
        due: new Date(Date.now()),
        urgency: "low" 
    }]

      
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


            {collapsed ? 
            <div>
                hidden
            </div>
            :
            <div>
            {optimisticTasks.map((task , index)=>{
            return(
                <DataTable columns={columns} data={taskData} />
            )})}
            </div>
            }







            <div> add task </div>
        </li>
    )
}