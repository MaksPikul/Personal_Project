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

    /*
    return (
        <div className="m-2"> 
            <div className={`flex justify-center rounded-md w-full items-center 
            ${expanded ? "":"transition duration-200 hover:bg-slate-200"}`}>
                
                
                    <Avatar className=" h-8 w-8 ">
                        <AvatarImage src={"https://en.wikipedia.org"}/>
                        <AvatarFallback> X </AvatarFallback>
                    </Avatar>
                
                
                <div 
                className={`flex text-start items-center justify-center
                overflow-hidden transition
                ${expanded ? "w-52 ml-2  " : "w-0"}`}>
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
    )*/


    return(
        <div className="m-2">
        {expanded ? 
            (<div className=" flex justify-center transition-all items-center rounded-md w-full ">
                <button 
                className="transition hover:bg-slate-200 flex rounded-md p-3 mr-1"
                    onClick={()=>setExpanded(!expanded)}>
                        <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={"https://en.wikipedia.org"}/>
                            <AvatarFallback> X </AvatarFallback>
                        </Avatar>
                

                <div className="flex flex-col items-start self-center truncate text-elipsis overflow-hidden w-16">
                    <p className="text-sm font-semibold truncate line-clamp-1" >{user?.name}</p>
                    <p className="flex text-xs">{status}</p>
                </div>
                </button>

                <div className="flex">
                    <button className="hover:bg-slate-200 p-2  rounded-md" onClick={()=>router.push("/account")}><CircleUserRound className="size-5" /></button>
                    <button className="hover:bg-slate-200 p-2  rounded-md" onClick={() => null}> <Moon className="size-5"/></button>
                    <button className="hover:bg-slate-200 p-2  rounded-md" onClick={()=>onOpen("signOut")}> <LogOut className="size-5"/></button>
                </div>

                
            </div>)
            : 
            (<button 
            onClick={()=>setExpanded(!expanded)}
            className="p-3 flex justify-center items-center rounded-md w-full transition-all hover:bg-slate-200">
                <Avatar className="h-8 w-8 ">
                    <AvatarImage src={"https://en.wikipedia.org"}/>
                    <AvatarFallback> X </AvatarFallback>
                </Avatar>
            </button>)
        }
        </div>
    )
}