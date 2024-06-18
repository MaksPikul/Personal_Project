

import { ProjectHeader } from "@/components/protected/project/project-header";
import { Separator } from "@/components/ui/separator";
import { ViewOptionHeader } from "@/components/protected/project/view/view-option-header"
import { MemberRole, View} from "@prisma/client";

import { auth } from "@/auth";
import { getProjectWithMembersWithProfiles , getProjectById } from "@/data/project";
import { ProjectWithMembersWithProfiles, ProjectWithViews } from "@/types";
import { getInitialView } from "@/data/view";
import { db } from "@/lib/db";

const BoardLayout = async ({
    children,
    params
}:{
    children: React.ReactNode;
    params: {
        boardId: string,
        viewId: string}
}) => {
    const session = await auth()
    const project = await getProjectWithMembersWithProfiles(params.boardId)
    const members = project?.members.filter((member)=> 
        member.userId !== session?.user.id)
    const role = project?.members.find((member)=>
        member.userId === session?.user.id)?.role

    // fetch and put views into project header to allow for navigation
    // inside navigation bar, ill map the 4 types, thell always be in the same place
    const views = await db.view.findMany({
        where:{
            projectId: params.boardId
        } 
    })
    const view = await db.view.findFirst({
        where:{
            id: params.viewId
        }
    })
    
    // if i want to display members in header then : members={members}
    
    return (
        <div className="flex flex-col bg-card rounded-md my-1 mr-1 w-screen">
            {/* send over members associated with project */}
            <ProjectHeader 
            project={project as ProjectWithMembersWithProfiles} 
            role={role as MemberRole}
            views={views as View[]}/>
            {/* might need a page options header, somewhere */}
            <Separator 
            className="bg-card-foreground"/>
            {children}
            
        </div>
    )
}

export default BoardLayout