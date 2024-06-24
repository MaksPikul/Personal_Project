"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../ui/checkbox"
import { AllocateMember, DataTableDelete, DataTableDropdown, DataTableSetDate, Notes } from "./data-table-row-actions"
import { DataTableEdit } from "./data-table-row-actions"
import { Member, Status, Task, Urgency, User } from "@prisma/client"
import * as z from "zod"
import { UpdateTaskSchema } from "@/schemas"
import { ArrowDown, ArrowUp, ArrowUpDown, Trash2, X } from "lucide-react"
import { Dispatch, SetStateAction } from "react"
import { Button } from "../ui/button"



export type TaskCols = {
    id: string
    assignee: string
    allocatedTo: Member
    status: "pending" | "processing" | "success" | "failed"
    due: Date
    urgency: "low" | "medium" | "high" 
  }




interface ColumnnProps {
  onDelete: (task: Task) => void
  onEdit: (task: Task, values: z.infer<typeof UpdateTaskSchema>) => void
  setStatus: (task: Task, status: Status) => void
  setUrgency: (task: Task, urgency: Urgency) => void
  setDate: (task: Task, newDate: any) => void
  saveNote: (
    values: z.infer<typeof UpdateTaskSchema>, 
    setSuccess: Dispatch<SetStateAction<string | undefined>>,
    setError: Dispatch<SetStateAction<string | undefined>>,
  ) => void,
  setMember: ((task: Task, newMember: Member) => void),
  members: (Member & User)[]
}

const statusOptions = [
  "PENDING",
  "INPROGRESS",
  "DONE",
  "ERROR"
]

const urgencyOptions = [
  "LOW",
  "MEDIUM",
  "HIGH"
]


export const getColumns =({
  onDelete, 
  onEdit, 
  setStatus,
  setUrgency,
  setDate, 
  saveNote,
  setMember,
  members
}:ColumnnProps): ColumnDef<TaskCols>[] => [
    {
        id: "select",
        header: ({ table }) => (
            
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
          
          
        ),
        cell: ({ row }) => (

          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />

        ),
        //enableSorting: false,
        //enableHiding: false,
    },

    {
      header: "Task Title",
      id:"title",
      cell: ({row}) => (
        <div className="flex flex-row gap-x-2"> 
          <DataTableEdit 
          row={row} 
          onEdit={onEdit} 
          />
          <Notes
          row={row}
          saveNote={saveNote}
          />
      
        </div>),
      footer: ()=> (<div>lol</div>)
    },
    {
        accessorKey: "assignee",
        header: "Assigned By",
        
    },
   /* {
      header: "Allocated To",
      cell: ({row}) =>
        
        <AllocateMember 
        row={row}
        setMember={setMember}
        members={members}/>
        
    },*/
    { 
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
          className="bg-indigo-900 "
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            {column.getIsSorted() === "asc"? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
          </Button>
        )
      },
      cell: ({row})=>
        <DataTableDropdown 
        row={row} 
        action={setStatus}
        options={statusOptions}
        currentVal={row.original.status}/>
    },
    {
      accessorKey: "due",
      header: ({ column }) => {
        return (
          <Button
            className="bg-indigo-900"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Due Date
            {column.getIsSorted() === "asc"? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />}
          </Button>
        )
      },
        cell: ({row}) => 
          <DataTableSetDate 
            row={row}
            action={setDate}
          />
        },
    {
      header: "Urgency",
      cell: ({row})=>
        <DataTableDropdown  
        row={row} 
        action={setUrgency}
        options={urgencyOptions}
        currentVal={row.original.urgency}/>
    },
    {
      id: "delete",
      

      cell: ({row}) => 
      <DataTableDelete 
      row={row} 
      onDelete={onDelete}/>
    },
    
  ]