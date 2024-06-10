import { auth } from "@/auth";
import { ProjectPage } from "@/components/protected/project/project-page";
import { db } from "@/lib/db";
import { authRoutes } from "@/routes";
import { redirect } from "next/navigation";

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
        <ProjectPage name={view?.type}/>
    )
}

export default ViewIdPage