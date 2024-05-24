"use client"

import { SideNavButton } from "./sidenav-button"
import { ProjectCard , Hobby} from "./project-card"
import { CreateProjectButton } from "./create-project"

import { Home, CalendarFold, Clock, BookUser, Plus} from 'lucide-react';

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

    const activeHobby = "2"
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
        <div className="w-64 bg-red-500 h-full flex flex-col">
            <div id="features" className=" space-y-2  p-3">
                <SideNavButton label="Home" href="/home" icon={<Home />}/>
                <SideNavButton label="Socials" href="/socials" icon={<BookUser />}/>
                <SideNavButton label="Schedule" href="/schedule" icon={<CalendarFold />}/>
                <SideNavButton label="Focus Sessions" href="/focus" icon={<Clock />}/>
                <Separator className="bg-black"/>
                <CreateProjectButton label="Create Hobby" href="" icon={<Plus />} />
                <Separator className="bg-black"/>
                {/*<CreateProject href="/"/>*/}
            </div>
            
            {/* my boards */}
            <Accordion
            type="multiple"
            defaultValue={defaultAccordionValues}
            className="space-y-2 p-3">
                {hobbies?.map((hobby)=>(
                    <ProjectCard 
                    key={hobby.id}
                    hobby={hobby as Hobby}
                    isActive={activeHobby === hobby.id}
                    isExpanded={expanded[hobby.id]}
                    onExpand={onExpand}/>
                )) }
            </Accordion>

            {/* Shared projects */}

            
        </div>
    )


}