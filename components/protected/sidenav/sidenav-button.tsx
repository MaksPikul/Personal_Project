"use client"

import Link from "next/link";

interface ButtonProps {
    label: string;
    href: string;
    icon: React.ReactNode;
}

export const SideNavButton = ({
    label,
    href,
    icon
}:ButtonProps) => {

    const onClick = () =>{

    }

    return(
    
    <Link href={href}>
        <button className="flex-row text-md flex rounded-md gap-6 p-3 m-0 w-full transition hover:bg-slate-300" onClick={()=>{onClick()}}>
            <div>{icon}</div>
            {label}
        </button>
    </Link>
    )
}