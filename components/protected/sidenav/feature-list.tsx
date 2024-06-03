"use client"

import { Separator } from "@/components/ui/separator"
import { Home, CalendarFold, Clock, BookUser, Plus} from 'lucide-react';
import { SideNavButton } from "./feature-button"
import { useParams, usePathname } from "next/navigation";


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
            <div className="px-2">
                <SideNavButton expanded={expanded} label="Home" href="/home" path={path} icon={<Home />}/>
                <SideNavButton expanded={expanded} label="Socials" href="/socials" path={path} icon={<BookUser />}/>
                <SideNavButton expanded={expanded} label="Schedule" href="/schedule" path={path} icon={<CalendarFold />}/>
                <SideNavButton expanded={expanded} label="Focus Sessions" href="/focus" path={path} icon={<Clock />}/> 
            </div>
    ) 
}