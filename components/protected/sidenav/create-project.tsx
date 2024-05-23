"use client"

import Link from "next/link";

interface CreateProjectProps {
    href: string;
    //icon: React.ReactNode;
}

export const CreateProject = ({
    href,
    //icon
}:CreateProjectProps) => {

    const onClick = () =>{

    }
    //on hover, make button wide and fadein "Create project"
    return(
        <Link href="?modal=true">
        <button className="bg-rose-600 size-16 self-center rounded-md hover:bg-slate-100" onClick={()=>{onClick()}}>
            +
        </button>
        </Link>
    )
}