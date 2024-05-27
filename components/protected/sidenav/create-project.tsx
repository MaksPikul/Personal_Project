"use client"

import { useModal } from "@/hooks/use-modal-store";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CreateProjectProps {
    label: string;
    icon: React.ReactNode;
}

export const CreateProjectButton = ({
    label,
    icon
}:CreateProjectProps) => {

    const { onOpen } = useModal();

    return(
    
    
        <button 
        onClick={()=>onOpen("CreateBoard")}
        className="flex-row text-md flex rounded-md gap-6 p-3 m-0 w-full transition hover:bg-slate-300" >
            <div>{icon}</div>
            {label}
        </button>
    
    )
}