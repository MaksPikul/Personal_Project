"use client"

import { Task, View } from "@prisma/client"
import { ListWithCards } from "@/types";
import { ListItem } from "@/components/protected/project/view/list/list-item";
import { useState , useEffect, useOptimistic} from "react"


interface TableProps {
    view: View;
    lists: ListWithCards[];
    projectId: string

}
export const TablePage = ({
    view,
    lists,
    projectId,

}: TableProps) => {


    


    //this component will receive members
    return (
        <ol className="bg-red-500 flex flex-col gap-y-3 h-full m-0">
            {lists.map((list,index)=>{
                
                return(
                    <ListItem 
                    key={list.id}
                    index={index}
                    list={list}
                    />
                )
            })}
        </ol>  
    )
}