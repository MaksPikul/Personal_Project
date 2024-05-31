"use client"

import { User} from "../profile/profile";
import { Boards} from "./board-button";
import { BoardList } from "./board-list";
import { CreateProjectButton } from "./create-button"
import { useState } from "react";
import { ChevronLast, ChevronFirst,} from "lucide-react"
import { ProfileCard } from "../profile/profile";
import { Separator } from "@/components/ui/separator";
import { SideNavButton } from "./feature-button";
import { usePathname } from "next/navigation";
import { Home, CalendarFold, Clock, BookUser, Plus} from 'lucide-react';



interface SideNavProps {
    boards: Boards
    user: User
    
}

export const SideNav = ({
    boards,
    user,
    
}:SideNavProps) => {
    const [expanded, setExpanded] = useState(true)
    const path = usePathname()
    

    return(
        <div className="flex flex-col bg-red-500 rounded-md m-1">
            <div className={`p-3  flex   rounded-md items-center ${
                expanded ? "justify-between px-4  " : "justify-center "
            }`}>
                <img
                src="https://img.logoipsum.com/288.svg"
                className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"}`}
                alt=""/>

                <button
                onClick={()=> setExpanded(!expanded)}
                className="p-2 rounded-lg bg-slate-50 hover:bg-red-100">
                    {expanded ? <ChevronFirst /> : <ChevronLast />}
                </button>
            </div>
                
                <Separator className=" bg-black"/>
                    <SideNavButton expanded={expanded} label="Home" href="/home" path={path} icon={<Home />}/>
                    <SideNavButton expanded={expanded} label="Socials" href="/socials" path={path} icon={<BookUser />}/>
                    <SideNavButton expanded={expanded} label="Schedule" href="/schedule" path={path} icon={<CalendarFold />}/>
                    <SideNavButton expanded={expanded} label="Focus Sessions" href="/focus" path={path} icon={<Clock />}/> 
                <Separator className=" bg-black"/>
                    <CreateProjectButton expanded={expanded} label="Create Board" icon={<Plus />} />
                <Separator className=" bg-black"/>
                    <BoardList boards={boards} expanded={expanded}/>
                <Separator className=" bg-black"/>
                    <ProfileCard user={user} status={"Online"} setExpanded={setExpanded} expanded={expanded}/>
        </div>
    )
}


/*
<div className="flex flex-col bg-red-500 rounded-md m-1">
            <div className={`p-2  flex  m-2 rounded-md items-center ${
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

            <ProfileCard user={user} status={"Online"} setExpanded={setExpanded} expanded={expanded}/>
        </div>
*/