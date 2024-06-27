import { auth } from "@/auth";

import { redirect} from "next/navigation";
import { getInitialView } from "@/data/view";
import { ViewOptionHeader } from "@/components/protected/project/view/view-option-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectPage } from "@/components/protected/project/view/project-page";
import { authRoutes } from "@/routes";
import { getProjectWithMembersWithProfiles } from "@/data/project";
import { getManyListsByProjectId } from "@/data/list";
import { ListWithCards, ProjectWithMembersWithProfiles } from "@/types";
import { roleContext } from "@/components/protected/project/project-header";
import { MemberRole } from "@prisma/client";

const BoardPage = async (
    {params}: {params: {boardId: string}}
) => {

    const session = await auth()
    
    if (!session?.user) {
        return redirect(authRoutes[0])
    }
    if (!params.boardId ){
        redirect("/home")
    }
    
    const project = await getProjectWithMembersWithProfiles(params.boardId)
    const lists = await getManyListsByProjectId(params.boardId)
    const role = project?.members.find((member)=>
        member.userId === session?.user.id)?.role

    



    //return redirect(`/boards/${params.boardId}/views/${initialView?.id}`)
    return(
        
        <ScrollArea>
            <ProjectPage 
            lists={lists as ListWithCards[]} 
            project={project as ProjectWithMembersWithProfiles}
            role={role as MemberRole}/>
        </ScrollArea>
       
    )
}
export default BoardPage
