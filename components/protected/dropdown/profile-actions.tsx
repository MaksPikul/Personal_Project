"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from 'next-auth/react'
import { useRouter } from "next/navigation";

interface ProfileActionProps {
    label: string;
}

export const ProfileActions = ({
    label,
}:ProfileActionProps) => {
    const router = useRouter()
    

    const style = "hover:bg-slate-300 w-full pr-32 justify-start"


    //use a map for this
    return (
        <div>
            <DropdownMenuItem className={style}>
                <button onClick={()=>router.push("/settings")}>Settings</button>
            </DropdownMenuItem>

            <DropdownMenuItem className={style}>
                <button onClick={()=>router.push("/account")}> Account </button>
            </DropdownMenuItem>

            <DropdownMenuItem className={style}>
                <button onClick={() => {signOut()}}>
                    sign out
                </button> 
            </DropdownMenuItem>
        </div>
    )
}