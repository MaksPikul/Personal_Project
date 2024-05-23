"use client"

import { SideNavButton } from "./sidenav-button"
import { ProjectCard , Hobby} from "./project-card"
import { CreateProject } from "./create-project"
import { IoHomeSharp } from "react-icons/io5";
import { getHobbiesByUserId } from "@/data/hobbies";

import Link from "next/link";
import {useLocalStorage } from "usehooks-ts"
import { Separator } from "@/components/ui/separator";
import { Accordion } from "@/components/ui/accordion";

interface SideNavProps {
    storageKey?: string;
}

export const SideNav =  ({
    storageKey = "nav-state",
}:SideNavProps) => {
    
    const [expanded, setExpanded] = useLocalStorage<Record<string,any>>(
        storageKey, 
        {}
    );
    
    const hobbies = [
        {id:"1", owner:"clwj7cxnm0000vupv8bfhul2s", name:"programming"},
        {id:"2", owner:"clwj7cxnm0000vupv8bfhul2s", name: "art"}
    ]
    //const hobbies = await getHobbiesByUserId("clwj7djzc0001vupv47x8a1yi")

    const defaultAccordionValues: string[] = Object
        .keys(expanded)
        .reduce((acc: string[], key: string) => {
            if (expanded[key]){
                acc.push(key);
            }
            return acc;
        },[])
    
    const onExpand = (id: string) => {
        setExpanded((curr)=>({
            ...curr, 
            [id]: !expanded[id],
        }))
    }; 

    

    return(
        <Accordion
        type="multiple"
        defaultValue={defaultAccordionValues}
        className="space-y-2">
            {hobbies?.map(({hobby})=>(
                <p> { hobby.id }</p>
            
                /*
                <ProjectCard 
                key={}
                hobby={"hobby" as Hobby}
                isActive={""}
                isExpanded={""}
                onExpand={onExpand}/>*/
            )) }
        </Accordion>
    )

/*
    return(
        <div className="w-64 bg-red-500 h-full flex flex-col">
            <div id="features" className=" border-b border-solid border-black">
                <SideNavButton label="Home" href="/" icon={<IoHomeSharp />}/>
                <SideNavButton label="Socials" href="/" icon={<IoHomeSharp />}/>
                <SideNavButton label="Schedule" href="/" icon={<IoHomeSharp />}/>
                <SideNavButton label="Focus Sessions" href="/" icon={<IoHomeSharp />}/>
            </div>

           



            
            <div id="projects" className="flex flex-col place-content-end">
                <ProjectCard label="Project Name" href="/" />
                <CreateProject href="/"/>
            </div>
        </div>
    )
    */
}