import { auth } from "@/auth";
import { db } from "@/lib/db";
import { authRoutes } from "@/routes";
import { redirect } from "next/navigation";

import { TablePage } from "@/components/protected/project/view/pages/table-page";
import { KanbanPage } from "@/components/protected/project/view/pages/kanban-page";
import { NotepadPage } from "@/components/protected/project/view/pages/notepad-page";
import { RoadmapPage } from "@/components/protected/project/view/pages/roadmap-page";
import { View } from "@prisma/client";
import { ListWithCards } from "@/types";
import { ViewOptionHeader } from "@/components/protected/project/view/view-option-header";


interface ChannelIdPageProps {
    params: {
        boardId: string;
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
   console.log(params.boardId)

    const lists = await db.list.findMany({
        where: {
            projectId: params.boardId
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
                <ViewOptionHeader view={view as View} projectId={params.boardId}/>

                {(view?.type==="KANBAN") &&
                <KanbanPage 
                name={view?.type}/>
                }

                {(view?.type==="TABLE") &&
                <TablePage 
                //will be replaced with view prop
                lists={lists as ListWithCards[]}
                view={view as View}
                projectId={params.boardId}/>
                }

                {(view?.type==="NOTEPAD") && 
                <NotepadPage 
                name={view?.type}/>
                }

                {(view?.type==="ROADMAP") &&
                <RoadmapPage 
                name={view?.type}/>
                }
            </div>
    )
}

export default ViewIdPage