"use client"

import { Profile, User} from "../dropdown/profile";
import { Boards} from "./board-button";
import { BoardList } from "./board-list";
import { AppFeatures } from "./feature-list";
import { CreateProjectButton } from "./create-button"
import { useState } from "react";
import { ChevronLast, ChevronFirst, Plus } from "lucide-react"

interface SideNavProps {
    boards: Boards
    user: User
    
}

export const SideNav = ({
    boards,
    user,
    
}:SideNavProps) => {
    const [expanded, setExpanded] = useState(true)
    
    /*
        <Separator className=" bg-black"/>
            <AppFeatures expanded={expanded}/>
                <Separator className=" bg-black"/>
            <CreateProjectButton expanded={expanded} label="Create Board" icon={<Plus />} />
                <Separator className=" bg-black"/>

                <BoardList boards={boards} expanded={expanded}/>
                <Separator className=" bg-black"/>
            <Profile user={user} expanded={expanded}/>
   */

    return(
        <div className="flex flex-col bg-red-500 rounded-md m-1">
            <div className={`p-2 px-2 flex  items-center ${
                expanded ? "justify-between px-4 p-2 " : "justify-center p-2"
            }`}>
                <img
                src="https://img.logoipsum.com/288.svg"
                className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"}`}
                alt=""/>

                <button
                onClick={()=> setExpanded(!expanded)}
                className="p-1.5 rounded-lg bg-slate-50 hover:bg-red-100">
                    {expanded ? <ChevronFirst /> : <ChevronLast />}
                </button>
            </div>
            
            <AppFeatures expanded={expanded}/>
            <CreateProjectButton expanded={expanded} label="Create Board" icon={<Plus />} />
            <BoardList boards={boards} expanded={expanded}/>
            <Profile user={user} expanded={expanded}/>
        </div>
    )
}