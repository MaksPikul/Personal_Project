"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../ui/checkbox"
import { useEditing } from "@/hooks/use-title-editing"
import { EditTaskForm } from "../protected/project/view/task/edit-task-form"

export type TaskCols = {
    id: string
    assignee: string
    status: "pending" | "processing" | "success" | "failed"
    due: Date
    urgency: "low" | "medium" | "high" 
  }



/*
const {
type,
isEditing,
editingData,
enableEditing,
disableEditing,
editingIndex
} = useEditing()
const isEditingOpen = isEditing && type === "taskTitle";
*/

export const columns: ColumnDef<TaskCols>[] = [
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



    /*{


        id: "taskTitle",
        header: ({ table }) => (
            
          
          editingData.title
          
        ),
        cell: ({ row }) => (
            <>
            {
                isEditing && editingData.index === editingIndex+1? 
                <EditTaskForm 
                task={task}
                enableEditing={enableEditing}
                disableEditing={disableEditing}
                disableTaskEditing={disableTaskEditing}
                setOptimisticTitle={setOptimisticTitle}
                />
               :
                <button 
                className="h-8 items-center text-lg flex hover:border rounded-md px-3"
                onClick={()=>enableEditing("taskTitle",{},editingIndex)}>
                    {/*optimisticTitle
                </button>
           }
            </>

        ),


    },*/
    



    {
        accessorKey: "assignee",
        header: "Assignee",
      },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
        accessorKey: "due",
        header: "Due",
        },
    {
      accessorKey: "urgency",
      header: "Urgency",
    },
    
  ]