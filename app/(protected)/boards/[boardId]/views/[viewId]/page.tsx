import { auth } from "@/auth";
import { db } from "@/lib/db";
import { authRoutes } from "@/routes";
import { redirect } from "next/navigation";


import { getViewByViewId } from "@/data/view";
import { getManyListsByProjectId } from "@/data/list";
import { View } from "@prisma/client";
import { ListWithCards, ProjectWithMembersWithProfiles } from "@/types";
import { ViewPage } from "@/components/protected/project/view/view-page";
import { getProjectWithMembersWithProfiles } from "@/data/project";


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

    if (!params.boardId ){
        redirect("/home")
    }

    const lists = await getManyListsByProjectId(params.boardId)

    //fetch all views, pass them into the corresponding component
    const view = await getViewByViewId(params.viewId)

    const project = getProjectWithMembersWithProfiles(params.boardId)
    
    

    //fetch the view

    //will most likely need a components for page, 
    //or, 4 different components, a different render for each,
    //Table and kaban will share the same options, 
    //cause they both work with tasks
    return(
        
        <>
        
        <ViewPage lists={lists as ListWithCards[]} view={view as View} project={project }/>
        
        
        </>
    )
}

export default ViewIdPage