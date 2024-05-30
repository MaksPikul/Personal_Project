import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";
import { Moon } from 'lucide-react';
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


interface ProfileCardProps {
    name: string | undefined;
    imgUrl: string | null | undefined;
    status: string;
    expanded: boolean
}

export const ProfileCard = ({
    name,
    imgUrl = "",
    status = "status",
    expanded
}:ProfileCardProps) => {

    //"p-3 m-3 space-x-4 justify-evenly rounded-md flex items-center bg-red-500 transition hover:bg-slate-300"
    //"flex flex-col gap-x-2 gap-y-2 w-40 text-wrap "
    return (
        <div className="flex flex-row justify-center py-2 px-2 rounded-md">
        
        <DropdownMenuTrigger className="flex justify-center flex-row rounded-md w-full py-2 items-center transition duration-200 hover:bg-slate-200">
            
            <Avatar className=" h-8 w-8 self-center">
                <AvatarImage src={"https://en.wikipedia.org"} className="size-sm"/>
                <AvatarFallback> P </AvatarFallback>
            </Avatar>
            
            <div 
            className={`flex text-start items-center
            overflow-hidden transition-all 
            ${expanded ? "w-52 ml-3" : "w-0"}`}>
                <div className="leading-4">
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-xs">{status}</p>
                </div>
            </div>

        </DropdownMenuTrigger>
        

        </div>
    )
}