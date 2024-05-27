"use client"

import { AccordionItem , AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import Link from "next/link";

export type Boards = {
    id: string,
    name:string | null,
    imageUrl:string | null,
    userId:string,
    createdAt: Date,
    updatedAt: Date,
  }[] | null

  export type BoardItem = {
    id: string,
    name:string | null,
    imageUrl:string | null,
    userId:string,
    createdAt: Date,
    updatedAt: Date,
  }

interface ProjectProps {
    board: BoardItem;
    isActive: boolean;
    isExpanded: boolean;
    onExpand: (id: string)=> void;
    //icon: React.ReactNode;
}

export const ProjectCard = ({
    board,
    isActive,
    isExpanded,
    onExpand
}:ProjectProps) => {
    const router = useRouter();

    const routes = [{
        label: "Projects",
        href: "/socials"
        //icon: 
        },
        {
        label: "Activity",
        href: ""
        //icon: 
        },
        {
        label: "Settings",
        href: ""
        //icon: 
        },
    ]

    const onClick = (href: string) =>{

        router.push(`/servers/${board.id}`)

    }
    
    if (!board) {
        return null
    }



//className="flex-row flex rounded-md gap-6 p-3 m-0 w-full hover:bg-slate-300"
    return (
        <AccordionItem 
        value={board.id }
        className="border-none"
        >
            <AccordionTrigger
            onClick={()=> onExpand(board.id)}
            className={cn(
                "flex flex-row gap-6 p-6 text-neutral-700 rounded-md hover:bg-slate-300 text-start no-underline hover:no-underline",
                isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
            )}>
                <div className="flex items-center gap-x-2">

                </div>
                <span className="">{board.name}</span>
            </AccordionTrigger>
            <AccordionContent
            className="pt-1 text-neutral-700 flex flex-col"
            >
                {routes?.map((route)=>(
                    
                    <Button
                    key={route.href}
                    size="sm"
                    onClick={()=>onClick(route.href)}>
                        {route.label}
                    </Button>
                    
                ))
                }
            </AccordionContent>
        </AccordionItem>
    )
}