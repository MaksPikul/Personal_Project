"use client"
import { Member, MemberRole, User } from "@prisma/client";
import { ProjectWithMembersWithProfiles, ProjectWithViews, UserWithProjectsWithMembers } from "@/types";
import { ProjectDropdown } from "./project-dropdown";
import { createContext, useEffect, useState } from "react"
import { ViewOptionHeader } from "./view/view-option-header";




interface ProjectHeaderProps {
    project: ProjectWithMembersWithProfiles;
    role?: MemberRole;
    members: UserWithProjectsWithMembers
}

export const roleContext = createContext(undefined)
export const ProjectHeader = ({
    project,
    role,
    members
}:ProjectHeaderProps) => {
    const isAdmin = role === MemberRole.ADMIN;
    const isMod = isAdmin || role === MemberRole.MOD;

    const [roles, setRoles] = useState({isAdmin: isAdmin, isMod: isMod})
    useEffect(()=>{
        setRoles({isAdmin: isAdmin, isMod: isMod})
    },[role])

    //might need a Options header here, or ill add in page
    return (
    <roleContext.Provider value={roles}>
        <header  className="items-center rounded-t-md p-0 bg-header text-l font-bold flex flex-row ">
            <ProjectDropdown 
                project={project as ProjectWithMembersWithProfiles}
                members={members}/>
            <ViewOptionHeader
                project={project}/>
        </header>
    </roleContext.Provider>
    )

}