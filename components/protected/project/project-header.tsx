"use client"

import { useModal } from "@/hooks/use-modal-store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { MemberRole } from "@prisma/client";
import { ProjectWithMembersWithProfiles } from "@/types";
import { UserPlus } from "lucide-react";

interface ProjectHeaderProps {
    project: ProjectWithMembersWithProfiles;
    role?: MemberRole;
}

export const ProjectHeader = ({
    project,
    role
}:ProjectHeaderProps) => {
    const { onOpen } = useModal()
    const isAdmin = role === MemberRole.ADMIN;
    const isMod = isAdmin || role === MemberRole.MOD;

    return (
        <header  className="items-center rounded-t-md p-0 bg-header text-l font-bold flex flex-row ">
            

            <DropdownMenu >
                <DropdownMenuTrigger>
                    <div className=" h-14 py-3 items-center flex pl-4 truncate w-60 rounded-tl-md border-r border-card-foreground">
                        {project?.name} 
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 border-0 flex flex-col justify-center">
                    {isMod && (
                    <DropdownMenuItem
                    onClick={()=>onOpen("invite", {project:project})}>
                    Invite new associates
                    <UserPlus />
                    </DropdownMenuItem> 
                    )}

                </DropdownMenuContent>
            </DropdownMenu>


            <p> Task/Main table | Kaban | notepad | Roadmap | Activity needs to be somewhere | TeamChat </p>

        </header>
    )

}