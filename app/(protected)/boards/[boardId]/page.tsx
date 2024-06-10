import { ProjectPage } from "@/components/protected/project/project-page"
import { auth } from "@/auth";

import { getProjectWithMembersWithProfiles } from "@/data/project";
import { MembersWithProfiles, ProjectWithMembersWithProfiles } from "@/types";
import { MemberRole, ViewType } from "@prisma/client";
import { redirect} from "next/navigation";
import { getInitialView } from "@/data/view";

const BoardPage = async (
    {params}: {params: {boardId: string}}
) => {
    const session = await auth()
    const project = await getInitialView(params.boardId, session?.user?.id)
    const initialView = project?.views[0]

    return redirect(`/boards/${params.boardId}/views/${initialView?.id}`)
}


/*
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
            {/* This page will get members and send to component 
            <ProjectPage 
            project={project as ProjectWithMembersWithProfiles} 
            role={role as MemberRole}
            members={members as MembersWithProfiles}/>
        </div>
    )
}
*/
export default BoardPage
