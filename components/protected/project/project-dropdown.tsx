import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { UserPlus, DoorOpen, Trash2, Settings, ChevronDown, X, Delete, Users } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { ProjectWithMembersWithProfiles, UserWithProjectsWithMembers } from "@/types";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteProjectModal } from "@/components/modals/delete-project-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { roleContext } from "./project-header";
import { Member, User } from "@prisma/client";
import { ManageMemberModal } from "@/components/modals/manage-members-modal";

interface ProjectDropdownProps {
    project: ProjectWithMembersWithProfiles;
    members: (Member&{user: User})[]
}

export const ProjectDropdown = ({
    project,
    members
}:ProjectDropdownProps) =>{
    const { onOpen, onClose } = useModal()
    const [opened, setOpened] = useState(false)
    const router = useRouter()
    
    const role = useContext(roleContext)


    return(
    <DropdownMenu onOpenChange={()=>setOpened(!opened)}>
        <DropdownMenuTrigger asChild>
            <div className=" h-14 py-3 items-center justify-between flex p-4 truncate w-60 rounded-tl-md border-r border-card-foreground">
                {project?.name} {opened ? <X/>:<ChevronDown />}
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border-0 flex flex-col justify-center">
            <DeleteProjectModal />
            <InviteModal />
            <ManageMemberModal />

            {role?.isMod && (
            <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex justify-between"
            onClick={()=>onOpen("invite", {project:project})}>
                Invite new Members
                <UserPlus />
            </DropdownMenuItem> 
            )}
            
            {role?.isAdmin && (
                <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="flex justify-between"
                onClick={()=>{
                    onOpen("ManageMembers", {members: members})
                    }}>
                    Manage Members
                    <Users />
                </DropdownMenuItem>
            )}

            {role?.isAdmin && (
                <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="flex justify-between"
                onClick={()=>{
                    onOpen("DeleteProject", {project:project})
                    //setOpened(!opened)
                    }}>
                    Delete Project
                    <Trash2 />
                </DropdownMenuItem>
            )}
            
            {!role?.isMod && (
            <DropdownMenuItem
            className="flex justify-between"
            onClick={()=>{
                
                onOpen("LeaveProject", {project:project})
                
                }}>
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