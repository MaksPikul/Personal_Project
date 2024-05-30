"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dispatch, SetStateAction } from "react";
import { Moon, LogOut, CircleUserRound } from 'lucide-react';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

export type User = {
    id: string,
    name: string,
    email: string,
    image: string | null,
    expires: Date
} | undefined


interface ProfileCardProps {
    user: User
    status: string;
    expanded: boolean;
    setExpanded: Dispatch<SetStateAction<boolean>>
}

export const ProfileCard = ({
    status = "status",
    expanded,
    user,
    setExpanded
}:ProfileCardProps) => {
    const router = useRouter()
    const { onOpen } = useModal();

    //"p-3 m-3 space-x-4 justify-evenly rounded-md flex items-center bg-red-500 transition hover:bg-slate-300"
    //"flex flex-col gap-x-2 gap-y-2 w-40 text-wrap "
    return (
        
        <div className=" py-2 px-2 "> 
        <div className={`flex justify-evenly rounded-md w-full items-center 
        ${expanded ? "py-2":"transition duration-200 hover:bg-slate-200"}`}>
            
            
                <Avatar className=" h-8 w-8 ">
                    <AvatarImage src={"https://en.wikipedia.org"} className="size-sm"/>
                    <AvatarFallback> X </AvatarFallback>
                </Avatar>
            
            
            <div 
            className={`flex text-start items-center justify-center
            overflow-hidden transition
            ${expanded ? "w-52 ml-1.5 py-1  " : "w-0"}`}>
                <div className="flex flex-row items-center ">
                    <div className="flex flex-col mr-5">
                        <p className="text-sm font-semibold trun" >{user?.name}</p>
                        <p className="text-xs">{status}</p>
                    </div>
                    {expanded ? 
                        (<div className=" mx-0.5 rounded-md ">
                            <button className="hover:bg-slate-200 p-2  rounded-md" onClick={()=>router.push("/account")}><CircleUserRound className="size-5" /></button>
                            <button className="hover:bg-slate-200 p-2  rounded-md" onClick={() => null}> <Moon className="size-5"/></button>
                            <button className="hover:bg-slate-200 p-2  rounded-md" onClick={()=>onOpen("signOut")}> <LogOut className="size-5"/></button>
                        </div>)
                    :(<div></div>)}
                </div>
            </div>
        </div>
        </div>
        
    )
}