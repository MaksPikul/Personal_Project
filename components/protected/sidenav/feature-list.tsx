"use client"

import { Separator } from "@/components/ui/separator"
import { Home, CalendarFold, Clock, BookUser, Plus} from 'lucide-react';
import { SideNavButton } from "./feature-button"
import { CreateProjectButton } from "./create-button"
import { usePathname } from "next/navigation";

export const AppFeatures = () =>{
    const path = usePathname()
    console.log(path)
    

    
    return(
        <p className="flex-col flex gap-y-1">
            <SideNavButton label="Home" href="/home" path={path} icon={<Home />}/>
            <SideNavButton label="Socials" href="/socials" path={path} icon={<BookUser />}/>
            <SideNavButton label="Schedule" href="/schedule" path={path} icon={<CalendarFold />}/>
            <SideNavButton label="Focus Sessions" href="/focus" path={path} icon={<Clock />}/> 
        </p>
    ) 
}