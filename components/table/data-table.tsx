"use client"
 
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Draggable } from "@hello-pangea/dnd"
import { Provider } from "@radix-ui/react-toast"
import { useEffect, useState } from "react"
import { Task } from "@prisma/client"

 
interface DataTableProps<TData, TValue> {
  table: any,
  columns: ColumnDef<TData, TValue>[]
}
 
export function DataTable<TData, TValue>({
  table,
  columns
}: DataTableProps<TData, TValue>) {

  
  return (
    <div className="rounded-b-md border">
      <Table
      className="">

        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row,index) => {


              return(
              <Draggable
              draggableId={row.original.id} 
              index={index}>
                {(provided)=>(
                  <TableRow
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  key={row.original.id}
                  data-state={row.getIsSelected() && "selected"}
                  >
                    
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  
                )}
              </Draggable>
              )


            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-16 text-center text-muted-foreground">
                No Tasks in this Group
              </TableCell>
            </TableRow>
          )}
          
        </TableBody>
      </Table>
    </div>
  )
}