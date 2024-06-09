import { ProjectPage } from "@/components/protected/project/project-page"
import { auth } from "@/auth";

import { getProjectWithMembersWithProfiles } from "@/data/project";
import { MembersWithProfiles, ProjectWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";


const BoardPage = async (
{params}: {params: {boardId: string}}
) => {
    const session = await auth()
    const project = await getProjectWithMembersWithProfiles(params.boardId)
    const members = project?.members.filter((member)=> 
        member.userId !== session?.user.id)
    const role = project?.members.find((member)=>
        member.userId === session?.user.id)?.role

    
    
    //Maybe put header in here too?
    return (
        
        <div className="h-full">
            {/* This page will get members and send to component */}
            <ProjectPage 
            project={project as ProjectWithMembersWithProfiles} 
            role={role as MemberRole}
            members={members as MembersWithProfiles}/>
        </div>
    )
}

export default BoardPage