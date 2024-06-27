"use client"

import { ListWithCards } from "@/types"
import { ListHeader } from "./list-header"
import { useState , useEffect , useOptimistic, useCallback, useMemo, useTransition, useRef, ElementRef, Dispatch, SetStateAction, } from "react"

import { List, Member, Status, Task, Urgency, User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Columns } from "./columns"

import { DataTable } from "@/components/table/data-table"
import { getColumns } from "@/components/table/columns"
import { DeleteTask } from "@/actions/tasks/delete-task";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
import { UpdateTask, UpdateTaskDate, UpdateTaskDesc, UpdateTaskUrgency } from "@/actions/tasks/update-task"

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
import { UpdateDescSchema, UpdateTaskSchema } from "@/schemas"
import { UpdateTaskStatus } from "@/actions/tasks/update-task-status"
import { ColumnFiltersState, SortingState, Table, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"

import { Draggable, Droppable } from "@hello-pangea/dnd"



    



interface ListItemProps {
    index: number
    list: ListWithCards
    members: (Member & User)[]
    
}

export const ListItem = ({
    index,
    list,
    members
}:ListItemProps) => {
    const router = useRouter()
    const [collapsed, setCollapsed] = useState(false)
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    //const [confirm, setConfirm] = useState(false)

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    



    const onDelete = useCallback((
        taskToDelete: Task
    )=> {
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

    const setStatus = useCallback((
        taskToEditStatus: Task,
        newStatus: Status,
        setCurrentVal: Dispatch<SetStateAction<string>>
    )=>{
        setCurrentVal(newStatus)
        startTransition(()=>{
            UpdateTaskStatus(taskToEditStatus, newStatus)
            .then((data) =>{
                if (data?.error){
                    setCurrentVal(taskToEditStatus.status)
                    toast({
                        title: `Error setting status for ${taskToEditStatus.title}`,
                        description: data?.error,
                        action: <ToastAction altText="Undo?">Undo</ToastAction>
                    })
                }
                else {
                    router.refresh()
                }
            })
        })
    }, [])

    const setUrgency = useCallback((
        taskToEditUrgency: Task,
        newUrgency: Urgency,
        setCurrentVal: Dispatch<SetStateAction<string>>
    )=>{
        setCurrentVal(newUrgency)
        startTransition(()=>{
            UpdateTaskUrgency(taskToEditUrgency, newUrgency)
            .then((data) =>{
                if (data?.error){
                    setCurrentVal(taskToEditUrgency.urgency)
                    toast({
                        title: `Error setting status for ${taskToEditUrgency.title}`,
                        description: data?.error,
                        action: <ToastAction altText="Undo?">Undo</ToastAction>
                    })
                }
                else {
                    
                    router.refresh()
                }
            })
        })
    }, [])

    const setDate = useCallback((
        taskToEditStatus: Task,
        newDate: any
    )=>{
        console.log("new date?")
        
        startTransition(()=>{
            UpdateTaskDate(taskToEditStatus, newDate)
            .then((data) =>{
                if (data?.error){
                    console.log("?")
                }
                else {
                    console.log("no way")
                    router.refresh()
                }
            })
        })
    }, [])

    

    const saveNote = useCallback((
        values: z.infer<typeof UpdateDescSchema>,
        setSuccess: Dispatch<SetStateAction<string | undefined>>,
        setError: Dispatch<SetStateAction<string | undefined>>
    )=>{
        startTransition(()=>{
            UpdateTaskDesc(values)
            .then((data) =>{
                if (data?.error){
                    setError(data?.error)
                }
                else {
                    setSuccess(data?.message)
                    router.refresh()
                }
            })
        })
    }, [])

    const setMember = useCallback((
        taskToEditMember: Task,
        newMember: Date
    )=>{
        startTransition(()=>{
            UpdateTaskMember(taskToEditMember, newMember)
            .then((data) =>{
                if (data?.error){
                    //setError(data?.error)
                }
                else {
                    //setSuccess(data?.message)
                    router.refresh()
                }
            })
        })
    }, [])

    const columns = useMemo(()=> getColumns({onDelete, onEdit, setStatus, setUrgency, setDate, saveNote, setMember, members}),[])
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const table = useReactTable({
        data: list.tasks,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
        sorting,
        columnFilters
        },
    })
    
    return (
        <Draggable 
        draggableId={list.id} 
        index={index}>
            {(provided)=>(

                <li 
                {...provided.draggableProps}
                ref={provided.innerRef}
                className=" flex flex-col m-1 gap-y-0 rounded-md  p-1">
                    
                    <div 
                    {...provided.dragHandleProps}>
                        <ListHeader
                        data={list}
                        table={table}
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        />
                        
                        
                                
                    {collapsed ? 
                    <div className="h-10 text-sm text-muted-foreground border-white border rounded-b-md flex justify-center items-center">
                        Tasks Hidden
                    </div>
                    :
                    <>
                    {isMounted ? 
                    <Droppable droppableId={list.id} type="task" >
                        {(provided)=>(
                        <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                            <DataTable table={table} columns={columns} />
                            {provided.placeholder}
                        </div>
                        )}
                    </Droppable>:
                    null}
                    </>
                    }
                    
                            
                    </div>
                </li>
            )}
        </Draggable>
    )
}


