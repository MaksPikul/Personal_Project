"use client"


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


import { ProfileCard } from "./profile-card"
import { ProfileInfo } from "./profile-info"
import { ProfileActions } from "./profile-actions"

export type User = {
    id: string,
    name: string,
    email: string,
    image: string | null,
    expires: Date
} | undefined

interface ProfileProps {
    user: User
    expanded: boolean
}

export const Profile = ({
    user,
    expanded
}:ProfileProps) => {

    return (
    <DropdownMenu>
            <ProfileCard 
            name={user?.name}
            imgUrl={user?.image}
            status="Online"
            expanded={expanded}/>
            
        <DropdownMenuContent sideOffset={8} className="ml-4">
            <DropdownMenuLabel>
                <div className="flex flex-col items-center"> 
                    User Actions
                </div>

            </DropdownMenuLabel>
            <DropdownMenuSeparator  className="bg-black"/>
            <DropdownMenuItem>
                <ProfileActions />
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    )
}