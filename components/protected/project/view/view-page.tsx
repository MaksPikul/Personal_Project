"use client"
import { TablePage } from "@/components/protected/project/view/pages/table-page";
import { KanbanPage } from "@/components/protected/project/view/pages/kanban-page";
import { NotepadPage } from "@/components/protected/project/view/pages/notepad-page";
import { RoadmapPage } from "@/components/protected/project/view/pages/roadmap-page";
import { View } from "@prisma/client";
import { ListWithCards } from "@/types";
import { ViewOptionHeader } from "@/components/protected/project/view/view-option-header";
import { useState, useEffect, useOptimistic } from "react";

interface ViewPageProps {
    lists : ListWithCards[]
    view : View
    projectId: string
}


export const ViewPage = ({
    lists,
    view,
    projectId
}:ViewPageProps) => {
    
    const [optimisticLists, addOptimisticLists] = useOptimistic(
        lists,
        (state, newList: ListWithCards) =>{
            return[...state, newList]
        }
    )
    


    return(
        <div>
            <ViewOptionHeader 
            view={view as View} 
            projectId={projectId} 
            optimisticLists={lists as ListWithCards[]}
            addOptimisticLists={addOptimisticLists}/>

            {(view?.type==="TABLE") &&
            <TablePage 
            lists={lists as ListWithCards[]}
            view={view as View}
            projectId={projectId}/>}






            {(view?.type==="KANBAN") &&
            <KanbanPage 
            name={view?.type}/>
            }

            {(view?.type==="NOTEPAD") && 
            <NotepadPage 
            name={view?.type}/>
            }

            {(view?.type==="ROADMAP") &&
            <RoadmapPage 
            name={view?.type}/>
            }
        </div>
    )
}