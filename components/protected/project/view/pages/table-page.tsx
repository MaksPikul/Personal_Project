"use client"

import { Member, Task, User, View } from "@prisma/client"
import { ListWithCards, ProjectWithMembersWithProfiles } from "@/types";
import { ListItem } from "@/components/protected/project/view/list/list-item";
import { useState , useEffect, useOptimistic} from "react"
import { Card } from "@/components/ui/card";


interface TableProps {
    view: View;
    lists: ListWithCards[];
    project: ProjectWithMembersWithProfiles

}
export const TablePage = ({
    view,
    lists,
    project,

}: TableProps) => {

    //this component will receive members
    return (
    <>
        <ol className=" flex flex-col h-full m-1 gap-y-5">
            {lists.map((list,index)=>{
                
                return(
                    <ListItem 
                    key={list.id}
                    index={index}
                    list={list}
                    members={project.members}
                    />
                )
            })}
        </ol>  
    
</>
    )
}