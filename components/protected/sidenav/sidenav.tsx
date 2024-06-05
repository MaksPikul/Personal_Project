"use client"

import { User} from "../profile/profile";
import { Boards} from "./board-button";
import { BoardList } from "./board-list";
import { CreateProjectButton } from "./create-button"
import { useState } from "react";
import { Menu } from "lucide-react"
import { ProfileCard } from "../profile/profile";
import { Separator } from "@/components/ui/separator";
import { SideNavButton } from "./feature-button";
import { usePathname } from "next/navigation";
import { Home, CalendarFold, Clock, BookUser, Plus} from 'lucide-react';

import { Card, CardContent } from "@/components/ui/card";


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
        <Card className="flex flex-col  rounded-md m-1 border-transparent">
            
            <div className={`p-3  flex   rounded-md items-center ${
                expanded ? " justify-between px-4  " : "justify-center "
            }`}>
                <img
                src="https://img.logoipsum.com/288.svg"
                className={`overflow-hidden transition-all  ${
                expanded ? "w-32" : "w-0"}`}
                alt=""/>

                <button
                onClick={()=> setExpanded(!expanded)}
                className="p-2 rounded-lg bg-slate-50 text-indigo-800">
                    {expanded ? <Menu className=""/> : <Menu className="rotate-90"/>}
                </button>
            </div>
                
                <Separator className=""/>
                    <SideNavButton expanded={expanded} label="Home" href="/home" path={path} icon={<Home />}/>
                    <SideNavButton expanded={expanded} label="Socials" href="/socials" path={path} icon={<BookUser />}/>
                    <SideNavButton expanded={expanded} label="Schedule" href="/schedule" path={path} icon={<CalendarFold />}/>
                    <SideNavButton expanded={expanded} label="Focus Sessions" href="/focus" path={path} icon={<Clock />}/> 
                <Separator className=" "/>
                    <CreateProjectButton expanded={expanded} label="Create Board" icon={<Plus />} />
                <Separator className=" "/>
                    <BoardList boards={boards} expanded={expanded}/>
                <Separator className=""/>
                    <ProfileCard user={user} status={"Online"} setExpanded={setExpanded} expanded={expanded}/>
                
        </Card>
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