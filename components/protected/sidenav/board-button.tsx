import { useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MemberRole, Project } from "@prisma/client";

interface ProjectProps {
    project: Project;
    isActive: boolean;
    expanded: boolean;
    role: MemberRole;
}

export const BoardCard = ({
    project,
    isActive,
    expanded,
    role
}:ProjectProps) => {
    const router = useRouter();
    if (!project) {
        return null
    }
    

    const onClick = () =>{
        router.push(`/boards/${project.id}`)
    }

    const getBoardInitials = () => {
        var parts = project?.name?.split(" ")
        var initials = ''
        if (!parts) {return ""}
        for (var i=0; i<parts?.length; i++) {
            if (parts[i].length > 0 && parts[i] !== '') 
            {
                initials +=  parts[i][0]
            }
        }
        return initials
    }


    // get role from member by project.id where user == user.id
    
    return (
        <button 
        onClick={()=>{onClick()}}
        className={`
        relative flex items-center text-start  my-1 p-1 h-14
        font-medium rounded-md cursor-pointer 
        transition-all group ${
        isActive  ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 " 
        : "hover:bg-indigo-50 hover:text-indigo-800" }`}>

            
            {project.imageUrl ? 
            <Image 
            src={project.imageUrl} 
            width={500}
            height={500}
            alt="Upload" 
            className="size-12 rounded-md"/> 
            :
            <div 
            className="size-12 bg-custom rounded-md flex justify-center  items-center">
                 { getBoardInitials() } 
            </div>}
            <div
            className={`overflow-hidden  transition-all  ${
                expanded ? "w-48 ml-2" : "w-0"
            }`}>
            <div>
                <p >{project.name} </p>
                <div className="text-sm ">
                    <Badge className="text-primary bg-secondary">{role}</Badge> 
                    <Badge className="text-primary bg-secondary">deadline</Badge></div>
            </div>

            </div>   
        </button>
    )
}