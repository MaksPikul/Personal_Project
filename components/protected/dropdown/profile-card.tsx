import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";
import { Moon } from 'lucide-react';
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ProfileCardProps {
    name: string | undefined;
    imgUrl: string | null | undefined;
    status: string;
}

export const ProfileCard = ({
    name,
    imgUrl,
    status = "status"
}:ProfileCardProps) => {

    //"p-3 m-3 space-x-4 justify-evenly rounded-md flex items-center bg-red-500 transition hover:bg-slate-300"
    //"flex flex-col gap-x-2 gap-y-2 w-40 text-wrap "
    return (
        <div className="flex flex-row items-center w-60 m-1 rounded-md bg-blue-500 ">
        <DropdownMenuTrigger className="flex flex-row rounded-md w-full px-3 py-2 transition duration-200 hover:bg-slate-200">
            <Avatar className="mr-2 h-8 w-8 self-center">
                <AvatarImage src={"imgUrl"} className="size-sm"/>
                <AvatarFallback> P </AvatarFallback>
            </Avatar>
            
            <div className=" flex flex-col items-start">
                <p className="text-nowrap">{name}</p>
                <p className="text-sm">{status}</p>
            </div>
        </DropdownMenuTrigger>
        <Toggle className="h-11 w-11 m-1 content-center"><Moon  /></Toggle>
        </div>
    )
}