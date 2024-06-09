"use client"

import { MembersWithProfiles, ProjectWithMembersWithProfiles } from "@/types"
import { MemberRole, } from "@prisma/client"

interface ProjectPageProps {
    project : ProjectWithMembersWithProfiles;
    role: MemberRole;
    members: MembersWithProfiles
}
export const ProjectPage = ({
    project, 
    role,
    members
}: ProjectPageProps) => {


    //this component will receive members
    return (
        <div className="h-full bg-red-500 ">
            <p>{role}</p>
        </div>
    )
}