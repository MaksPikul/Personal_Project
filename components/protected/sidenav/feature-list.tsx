"use client"

import { Separator } from "@/components/ui/separator"
import { Home, CalendarFold, Clock, BookUser, Plus} from 'lucide-react';
import { SideNavButton } from "./feature-button"
import { CreateProjectButton } from "./create-button"

import { ScrollArea } from "@/components/ui/scroll-area";
import { BoardCard, Boards, BoardItem } from "./board-button";
import { useParams, usePathname } from "next/navigation";
import { Profile, User } from "../dropdown/profile";

interface NavListProps {
    expanded: boolean
}


export const AppFeatures = ({
    expanded
}:NavListProps) =>{
    const path = usePathname()
    console.log(path)
    const params = useParams()
    

    
    return( 
            <p className="px-2 ">
                <Separator className=" bg-black"/>
                <SideNavButton expanded={expanded} label="Home" href="/home" path={path} icon={<Home />}/>
                <SideNavButton expanded={expanded} label="Socials" href="/socials" path={path} icon={<BookUser />}/>
                <SideNavButton expanded={expanded} label="Schedule" href="/schedule" path={path} icon={<CalendarFold />}/>
                <SideNavButton expanded={expanded} label="Focus Sessions" href="/focus" path={path} icon={<Clock />}/> 
                <Separator className=" bg-black"/>
            </p>
    ) 
}