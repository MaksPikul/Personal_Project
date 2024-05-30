"use client"

import { useModal } from "@/hooks/use-modal-store";
import { Separator } from "@/components/ui/separator";


interface CreateProjectProps {
    label: string;
    icon: React.ReactNode;
    expanded: boolean
}

export const CreateProjectButton = ({
    label,
    icon,
    expanded
}:CreateProjectProps) => {

    const { onOpen } = useModal();

    return(
    <div className="px-2">
        <button 
            onClick={()=>onOpen("CreateBoard")}
            className={`
            relative flex items-center text-start h-10 py-2 px-3 my-1
            font-medium rounded-md cursor-pointer 
            transition-colors group hover:bg-indigo-50 text-gray-600 "flex-1 px-3"`}>
                
            {icon}  
            <p 
            className={`overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
            }`}>
            {label}
            </p>   
        </button>
        <Separator className=" bg-black"/>
    </div>
    )
}