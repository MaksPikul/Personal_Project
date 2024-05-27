"use client"

import { ProjectCard } from "./project-card"


import { SNFeatures } from "./sidenav-features";

import {useLocalStorage } from "usehooks-ts"
import { Accordion } from "@/components/ui/accordion";
import { Boards, BoardItem } from "./project-card";
import { useEffect } from "react";



interface SideNavProps {
    storageKey?: string;
    boards? : Boards;
}

export const SideNav =  ({
    storageKey = "nav-state",
    boards
}:SideNavProps) => {
    

    const [expanded, setExpanded] = useLocalStorage<Record<string,any>>(
        storageKey, 
        {}
    );

    const activeHobby = "2"
     //const hobbies = await getHobbiesByUserId("clwj7djzc0001vupv47x8a1yi")

    const defaultAccordionValues: string[] = Object
        .keys(expanded)
        .reduce((acc: string[], key: string) => {
            if (expanded[key]){
                acc.push(key);
            }
            return acc;
        },[])

    const onExpand = (id: string) => {
        setExpanded((curr)=>({
            ...curr, 
            [id]: !expanded[id],
        }))
    };
    return(
        <div className="w-64 bg-red-500 h-full flex flex-col">
            <SNFeatures />

            {/* my boards */}
            <Accordion
            type="multiple"
            defaultValue={defaultAccordionValues}
            className="space-y-2 p-3">
                {boards?.map((boardItem)=>(
                    <ProjectCard 
                    key={boardItem.id}
                    board={boardItem as BoardItem}
                    isActive={activeHobby === boardItem.id}
                    isExpanded={expanded[boardItem.id]}
                    onExpand={onExpand}/>
                )) }
            </Accordion>

            {/* Shared projects */}

            
        </div>
    )


}