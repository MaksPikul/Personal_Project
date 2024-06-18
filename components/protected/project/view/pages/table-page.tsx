"use client"

import { View } from "@prisma/client"
import { ListWithCards } from "@/types";
import { useState, useEffect } from "react";
import { ListItem } from "@/components/protected/project/view/list-item";

interface TableProps {
    view: View;
    lists: ListWithCards[];
    projectId: string
}
export const TablePage = ({
    view,
    lists,
    projectId
}: TableProps) => {
    const [orderedData, setOrderedData] = useState(lists);

    useEffect (()=>{
        setOrderedData(lists)
    },[lists])

    //this component will receive members
    return (
        <ol className="bg-red-500 flex flex-col gap-y-3 h-full">
            {orderedData.map((list,index)=>{
                return(
                    <ListItem 
                    key={list.id}
                    index={index}
                    data={list}
                    />
                )
            })}
        </ol>  
    )
}