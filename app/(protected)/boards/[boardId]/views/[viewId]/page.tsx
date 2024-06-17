import { auth } from "@/auth";
import { ProjectPage } from "@/components/protected/project/project-page";
import { db } from "@/lib/db";
import { authRoutes } from "@/routes";
import { redirect } from "next/navigation";

import { TableOptions } from "@/components/protected/project/view/options/table-options";
import { RoadmapOptions } from "@/components/protected/project/view/options/roadmap-options";
import { NotepadOptions } from "@/components/protected/project/view/options/notepad-options";
import { KanbanOptions } from "@/components/protected/project/view/options/kanban-options";

import { TablePage } from "@/components/protected/project/view/pages/table-page";
import { KanbanPage } from "@/components/protected/project/view/pages/kanban-page";
import { NotepadPage } from "@/components/protected/project/view/pages/notepad-page";
import { RoadmapPage } from "@/components/protected/project/view/pages/roadmap-page";
import { View } from "@prisma/client";
import { ListWithCards } from "@/types";


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

    /*if (!params.projectId ){
        redirect("/home")
    }*/

    const lists = await db.list.findMany({
        where: {
            projectId: params.projectId
        },
        include: {
            tasks: {
                orderBy: {
                    order: "asc"
                }
            }
        },
        orderBy: {
            order: "asc"
        }
    })
    
    //fetch all views, pass them into the corresponding component
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
            {(view?.type==="TABLE") &&
            <div>
            <TableOptions 
            projectId={params.projectId}/>
            <TablePage 
            //will be replaced with view prop
            lists={lists as ListWithCards[]}
            view={view as View}
            projectId={params.projectId}/>
            </div>
            }

            {(view?.type==="KANBAN") &&
            <div>
            <KanbanOptions />
            <KanbanPage 
            name={view?.type}/>
            </div>}

            {(view?.type==="NOTEPAD") && 
            <div>
            <NotepadOptions />
            <NotepadPage 
            name={view?.type}/>
            </div>}

            {(view?.type==="ROADMAP") && 
            <div>
            <RoadmapOptions />
            <RoadmapPage 
            name={view?.type}/>
            </div>}

            {/*<ProjectPage name={view?.type}/>*/}
        </div>
    )
}

export default ViewIdPage