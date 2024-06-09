

import { ProjectHeader } from "@/components/protected/project/project-header";
import { Separator } from "@/components/ui/separator";
import { MemberRole} from "@prisma/client";

import { auth } from "@/auth";
import { getProjectWithMembersWithProfiles , getProjectById } from "@/data/project";
import { ProjectWithMembersWithProfiles } from "@/types";

const BoardLayout = async ({
    children,
    params
}:{
    children: React.ReactNode;
    params: {boardId: string}
}) => {
    const session = await auth()
    const project = await getProjectWithMembersWithProfiles(params.boardId)
    const members = project?.members.filter((member)=> 
        member.userId !== session?.user.id)
    const role = project?.members.find((member)=>
        member.userId === session?.user.id)?.role

    //members={members}
    return (
        <div className="flex flex-col bg-card rounded-md my-1 mr-1 w-screen">
            {/* send over members associated with project */}
            <ProjectHeader 
            project={project as ProjectWithMembersWithProfiles} 
            role={role as MemberRole}
            />
            <Separator className="bg-card-foreground"/>
            {children}
        </div>
    )
}

export default BoardLayout