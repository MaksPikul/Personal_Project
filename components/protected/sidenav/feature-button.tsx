"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";

interface ButtonProps {
    label: string;
    href: string;
    path: string;
    icon: React.ReactNode;
    expanded: boolean
}

export const SideNavButton = ({
    label,
    href,
    path,
    icon,
    expanded
}:ButtonProps) => {
    const router = useRouter()


    return(
        <button 
        onClick={()=>router.push(href)}
        className={`
        relative flex items-center text-start self-center h-12 py-3 px-3 m-1
        font-medium rounded-md cursor-pointer 
        transition group ${
        path === href  ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" 
        : "hover:bg-indigo-50 hover:text-indigo-800 " }`}>
            {icon}  
            <p 
            className={`overflow-hidden transition-all ${
                expanded ? "w-48 ml-3" : "w-0"
            }`}>
            {label}
            </p>   
        </button>

    )
}