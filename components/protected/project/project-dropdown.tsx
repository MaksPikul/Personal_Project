import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { UserPlus, DoorOpen, Trash2, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { ProjectWithMembersWithProfiles } from "@/types";

interface ProjectDropdownProps {
    project: ProjectWithMembersWithProfiles;
    isAdmin: boolean;
    isMod: boolean;
}

export const ProjectDropdown = ({
    project,
    isAdmin,
    isMod
}:ProjectDropdownProps) =>{
    const { onOpen } = useModal()

    return(
    <DropdownMenu >
        <DropdownMenuTrigger>
            <div className=" h-14 py-3 items-center flex pl-4 truncate w-60 rounded-tl-md border-r border-card-foreground">
                {project?.name} 
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border-0 flex flex-col justify-center">
            {isMod && (
            <DropdownMenuItem
            className="flex justify-between"
            onClick={()=>onOpen("invite", {project:project})}>
                Invite new associates
                <UserPlus />
            </DropdownMenuItem> 
            )}
            {isAdmin && (
                <DropdownMenuItem
                className="flex justify-between"
                onClick={()=>onOpen("DeleteProject", {project:project})}>
                    Delete Project
                    <Trash2 />
                </DropdownMenuItem>
            )}
            {!isAdmin && (
            <DropdownMenuItem
            className="flex justify-between"
            onClick={()=>onOpen("LeaveProject", {project:project})}>
                Leave Project
                <DoorOpen />
            </DropdownMenuItem>
            )}
            <DropdownMenuItem
            onClick={()=>{}}
            className="flex justify-between">
                Project Settings
                <Settings />
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    )
}