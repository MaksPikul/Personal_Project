"use client"

import Link from "next/link";

interface ButtonProps {
    label: string;
    href: string;
    path: string;
    icon: React.ReactNode;
}

export const SideNavButton = ({
    label,
    href,
    path,
    icon
}:ButtonProps) => {
    


    return(
        
    <Link href={href} className="">
        <button 
        className={`p-2 flex-row text-md flex w-60 rounded-md transition duration-200 hover:bg-slate-300
            ${path === href ? "bg-red-200" : ""}`} >
                <p className="mx-3">{icon}</p>
                <p>{label}</p>   
        </button>
    </Link>
    
    )
}