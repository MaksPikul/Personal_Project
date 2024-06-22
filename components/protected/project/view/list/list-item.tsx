"use client"

import { ListWithCards } from "@/types"
import { ListHeader } from "./list-header"
import { useState , useEffect , useOptimistic, useCallback, useMemo, useTransition, useRef, ElementRef, } from "react"

import { List, Task } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Columns } from "./columns"

import { DataTable } from "@/components/table/data-table"
import { getColumns } from "@/components/table/columns"
import { DeleteTask } from "@/actions/tasks/delete-task";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
import { UpdateTask } from "@/actions/tasks/update-task"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { UseFormReturn, useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdateTaskSchema } from "@/schemas"





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
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    //const [confirm, setConfirm] = useState(false)
   
    const onDelete = useCallback((taskToDelete: Task)=> {
        toast({
            title: `you deleted task ${taskToDelete.title}`,
            action: <ToastAction altText="Undo?">Undo</ToastAction>
        })
        startTransition(()=>{
            DeleteTask(taskToDelete)
            .then((data) =>{
                if (data?.error){
                    //setError(data?.error)
                    //toast errors
                }
                else {
                    router.refresh()
                }
            })
        })
    },[])


    const onEdit = useCallback((
        values: z.infer<typeof UpdateTaskSchema>,
        disableTaskEditing: ()=> void
    )=>{
        startTransition(()=>{
            UpdateTask(values)
            .then((data) =>{
                if (data?.error){
                    //setError(data?.error)
                }
                else {
                    disableTaskEditing();
                    router.refresh()
                }
            })
        })
        
    }, [])

    const setStatus = useCallback(()=>{
        return
    }, [])

    const columns = useMemo(()=> getColumns({onDelete, onEdit, setStatus}),[])
    return (
        <li className="bg-green-600 ">
            <ListHeader
            data={list}
            
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            />
            
            {collapsed ? 
            <div>
                hidden
            </div>
            :
            <DataTable columns={columns} data={list.tasks} />
            }
        </li>
    )
}