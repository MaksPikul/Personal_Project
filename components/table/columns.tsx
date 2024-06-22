"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../ui/checkbox"
import { DataTableDelete, DataTableStatus } from "./data-table-row-actions"
import { DataTableEdit } from "./data-table-row-actions"
import { Task } from "@prisma/client"
import * as z from "zod"
import { UpdateTaskSchema } from "@/schemas"



export type TaskCols = {
    id: string
    assignee: string
    status: "pending" | "processing" | "success" | "failed"
    due: Date
    urgency: "low" | "medium" | "high" 
  }




interface ColumnnProps {
  onDelete: (task: Task) => void
  onEdit: (task: Task, values: z.infer<typeof UpdateTaskSchema>) => void
  setStatus: () => void
}


export const getColumns =({
  onDelete, 
  onEdit, 
  setStatus
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
      cell: ({row}) => 
      <DataTableEdit 
      row={row} 
      onEdit={onEdit} 
      />
    },
    {
      id:"z",
        accessorKey: "assignee",
        header: "Assignee",
        
      },
    {
      header: "Status",
      cell: ({row})=>
        <DataTableStatus 
        row={row} 
        onEdit={onEdit}/>
    },
    {
        accessorKey: "due",
        header: "Due",
        },
    {
      accessorKey: "urgency",
      header: "Urgency",
    },
    {
      id: "delete",
      cell: ({row}) => <DataTableDelete row={row} onDelete={onDelete}/>
    },
    
  ]