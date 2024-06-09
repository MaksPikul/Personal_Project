"use client"

//Components
import { BoardList } from "./board-list";
import { CreateProjectButton } from "./create-button"
import { ProfileCard } from "../profile/profile";
import { Separator } from "@/components/ui/separator";
import { SideNavButton } from "./feature-button";
import { usePathname } from "next/navigation";
import { Card} from "@/components/ui/card";
//icons
import { Home, CalendarFold, Clock, BookUser, Plus, Menu } from 'lucide-react';
//react
import { useState } from "react";
//types
import { User, Member } from "@prisma/client";
import { Membership, ProjectWithMembers, UserWithProjectsWithMembers } from "@/types";

interface SideNavProps {
    memberships: Membership[];
    user: User
}

export const SideNav = ({
    memberships,
    user,
}:SideNavProps) => {
    const [expanded, setExpanded] = useState(true)
    const path = usePathname()
    
   
    

    return(
        <Card className="flex flex-col rounded-md m-1 border-transparent">
            
            <div className={`h-14  flex rounded-t-md items-center  ${
                expanded ? " justify-between px-4  " : "justify-center "
            }`}>
                <img
                src="https://img.logoipsum.com/288.svg"
                className={`overflow-hidden transition-all  ${
                expanded ? "w-32" : "w-0"}`}
                alt=""/>

                <button
                onClick={()=> setExpanded(!expanded)}
                className="p-2 rounded-lg bg-indigo-100 text-card-foreground">
                    {expanded ? <Menu className="text-primary"/> : <Menu className="text-primary rotate-90"/>}
                </button>
            </div>
                
                <Separator className="bg-card-foreground"/>
                    <SideNavButton expanded={expanded} label="Home" href="/home" path={path} icon={<Home />}/>
                    <SideNavButton expanded={expanded} label="Socials" href="/socials" path={path} icon={<BookUser />}/>
                    <SideNavButton expanded={expanded} label="Schedule" href="/schedule" path={path} icon={<CalendarFold />}/>
                    <SideNavButton expanded={expanded} label="Focus Sessions" href="/focus" path={path} icon={<Clock />}/> 
                <Separator className="bg-card-foreground"/>
                    <CreateProjectButton expanded={expanded} label="Create Board" icon={<Plus />} />
                <Separator className="bg-card-foreground"/>
                    <BoardList memberships={memberships as Membership[]} expanded={expanded} user={user as User}/>
                <Separator className="bg-card-foreground"/>
                    <ProfileCard user={user as User} status={"Online"} setExpanded={setExpanded} expanded={expanded}/>
                
        </Card>
    )
}
