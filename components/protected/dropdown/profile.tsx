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
}

export const Profile = ({
    user
}:ProfileProps) => {

    return (
    <DropdownMenu>
            <ProfileCard 
            name={user?.name}
            imgUrl={user?.image}
            status="Online"/>
            
        <DropdownMenuContent sideOffset={8} className="ml-2.5">
            <DropdownMenuLabel>
                <ProfileInfo 
                name={user?.name}
                email={user?.email}
                imgUrl={user?.image}/>

            </DropdownMenuLabel>
            <DropdownMenuItem>
                <ProfileActions 
                label="lol"/>

            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    )
}