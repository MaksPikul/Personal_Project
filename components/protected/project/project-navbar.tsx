import { ProjectWithViews } from "@/types";
import { View } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ProjectNavbarProps {
    views: View[];
    projectId: string
}

export const ProjectNavbar = ({
    views,
    projectId
}:ProjectNavbarProps) => {
    const router = useRouter()
    
    
   if (!views) {
    return null
   }

    return(
        <div>
            {views.map((view)=>{  
                return (
                    <Button
                    className="text-white"
                    onClick={
                    ()=>router.push(`${view.id}`)}>
                        {view.type}
                    </Button>
                )
            })}
        </div>

    )
}
