import { auth } from "@/auth";
import { ProjectPage } from "@/components/protected/project/project-page";
import { db } from "@/lib/db";
import { authRoutes } from "@/routes";
import { redirect } from "next/navigation";

import { TableKanbanOptions } from "@/components/protected/project/view/table-kanban-options";
import { RoadmapOptions } from "@/components/protected/project/view/roadmap-options";
import { NotepadOptions } from "@/components/protected/project/view/notepad-options";

interface ChannelIdPageProps {
    params: {
        projectId: string;
        viewId: string;
    }
}

const ViewIdPage = async ({
    params
}:ChannelIdPageProps) => {
    const session = await auth()
    if (!session?.user) {
        return redirect(authRoutes[0])
    }

    
    const view = await db.view.findFirst({
        where:{
            id: params.viewId
        }
    })

    //fetch the view

    //will most likely need a components for page, 
    //or, 4 different components, a different render for each,
    //Table and kaban will share the same options, 
    //cause they both work with tasks
    return(
        <div>
            {(view?.type==="TABLE" || view?.type==="KANBAN") &&
            <TableKanbanOptions />}

            {(view?.type==="NOTEPAD") && 
            <NotepadOptions />}

            {(view?.type==="ROADMAP") && 
            <RoadmapOptions />}

            <ProjectPage name={view?.type}/>
        </div>
    )
}

export default ViewIdPage