import { ProjectWithViews } from "@/types";
import { View } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";

interface ProjectNavbarProps {
    views: View[];
    projectId: string
}

export const ProjectNavbar = ({
    views,
    projectId
}:ProjectNavbarProps) => {
    const router = useRouter()
    const params = useParams() 
    
    if (!views) {
        return null
    }

    return(
        <div className="flex flex-row items-center mx-5">
            {views.map((view)=>{ 
                const title  = view.type[0]  + view.type.substring(1).toLowerCase();

                return (
                    <button
                    className={`
                        ${params.viewId === view.id && " border-indigo-600"}
                        text-primary-foreground mx-2 transition pointer-events-auto rounded-t-sm
                        hover:bg-indigo-200 py-2 px-3 w-28 items-center justify-center border-b-4`}
                    onClick={
                    ()=>router.push(`${view.id}`)}>
                        {title}
                    </button>
                )
            })}
        </div>
    )
}
