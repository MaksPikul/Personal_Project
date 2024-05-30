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
        relative flex items-center text-start self-center h-10 py-2 px-3 my-1
        font-medium rounded-md cursor-pointer 
        transition group ${
        path === href  ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" 
        : "hover:bg-indigo-50 text-gray-600" }`}>
            {icon}  
            <p 
            className={`overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
            }`}>
            {label}
            </p>   
        </button>

    )
}