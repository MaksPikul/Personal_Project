"use client"

import { AccordionItem , AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { useRouter } from "next/router";

export type Hobby ={
    id: string;
    owner: string;
    name: string
    //slug: string;
    //imageUrl: string;
    
}

interface ProjectProps {
    hobby: Hobby;
    isActive: boolean;
    isExpanded: boolean;
    onExpand: (id: string)=> void;
    //icon: React.ReactNode;
}

export const ProjectCard = ({
    hobby,
    isActive,
    isExpanded,
    onExpand
}:ProjectProps) => {
   // const router = useRouter();

    const routes = [{
        label: "Projects",
        href: "/"
        //icon: 
        },
        {
        label: "Activity",
        href: "/"
        //icon: 
        },
        {
        label: "Settings",
        href: "/"
        //icon: 
        },
    ]
    
    

    const onClick = (href: string) =>{

    }
/*
    return(
        <button className="rounded-md m-4 p-3 flex flex-row justify-around hover:bg-slate-100" onClick={()=>{onClick()}}>
            {/*icon*
            <div id="thumbnail" className="size-14 text-center rounded-full bg-rose-600">PH</div>
            {label}
        </button>
    )
*/
    return (
        <AccordionItem 
        value={hobby.id}
        className="border-none"
        >
            <AccordionTrigger
            onClick={()=> onExpand(hobby.id)}
            className={cn(
                "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
                isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
            )}>
                <div className="flex items-center gap-x-2">

                </div>
                <span className="font-medium text-sm">{hobby.name}</span>
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