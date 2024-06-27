"use client"
import { MemberRole , View } from "@prisma/client";
import { ProjectWithMembersWithProfiles, ProjectWithViews } from "@/types";
import { ProjectDropdown } from "./project-dropdown";
import { ProjectNavbar } from "./project-navbar";
import { ViewOptionHeader } from "./view/view-option-header";
import { useParams } from "next/navigation";


interface ProjectHeaderProps {
    project: ProjectWithMembersWithProfiles;
    role?: MemberRole;
}

export const ProjectHeader = ({
    project,
    role,
}:ProjectHeaderProps) => {
    const isAdmin = role === MemberRole.ADMIN;
    const isMod = isAdmin || role === MemberRole.MOD;
    

    
    //might need a Options header here, or ill add in page
    return (
    <header  className="items-center rounded-t-md p-0 bg-header text-l font-bold flex flex-row ">
        <ProjectDropdown 
            project={project as ProjectWithMembersWithProfiles} 
            isAdmin={isAdmin} 
            isMod={isMod}/>
        <ViewOptionHeader
            project={project} />
        {/*<ProjectMembers>*/}
    </header>
    )

}