"use client"

import { MembersWithProfiles, ProjectWithMembersWithProfiles } from "@/types"
import { MemberRole, } from "@prisma/client"

interface ProjectPageProps {
    name: string | undefined
}
export const ProjectPage = ({
    name
}: ProjectPageProps) => {


    //this component will receive members
    return (
        <div className="h-full bg-red-500 ">
            <p>{name}</p>
        </div>
    )
}