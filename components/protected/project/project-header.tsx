import { Separator } from "@/components/ui/separator";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

interface ProjectHeaderProps {
    title: string | null | undefined;
}

export const ProjectHeader = ({
    title
}:ProjectHeaderProps) => {
    

    

    return (
        <header  className="items-center rounded-t-md p-0 bg-header text-l font-bold flex flex-row ">
            <DropdownMenu >
                <DropdownMenuTrigger>
                    <div className=" h-14 py-3 items-center flex pl-4 truncate w-60 rounded-tl-md border-r border-card-foreground">
                        {title} 
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 flex flex-col justify-center">
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-black mx-2"/>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )

}