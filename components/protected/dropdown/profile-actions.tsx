"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { Settings, LogOut, CircleUserRound } from 'lucide-react';



export const ProfileActions = () => {
    const router = useRouter()
    const style = "hover:bg-slate-300 w-full justify-start"
    //use a map for this
    return (
        <div>
            <DropdownMenuItem className={style}>
                <button className="flex pr-24 flex-row gap-x-2 items-center" onClick={()=>router.push("/account")}> Account <CircleUserRound /></button>
            </DropdownMenuItem>

            <DropdownMenuItem className={style}>
                <button className="flex pr-24 flex-row gap-x-2 items-center" onClick={() => {signOut()}}>
                    sign out <LogOut />
                </button> 
            </DropdownMenuItem>
        </div>
    )
}