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
        className="p-2 flex-row text-md flex w-60 rounded-md transition duration-100 hover:bg-slate-300" >
            <div className="mx-3">{icon}</div>
            {label}
        </button>
    )
}