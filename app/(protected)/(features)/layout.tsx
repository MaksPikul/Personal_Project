"use client"

import { Header } from "@/components/protected/header";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";


const FeatureLayout = ({children}:{children: React.ReactNode;}) => {
    const path = usePathname()
    const {data: session} = useSession()
    let title;
    

    switch (path){
        case "/home":
        title = "Home Dashboard";
        break;
        case "/focus":
        title = "Focus Dashboard";
        break;
        case "/schedule":
        title = "Schedule Dashboard";
        break;
        case "/socials":
        title = "Social Dashboard";
        break;
        default:
        title = "In back rooms"
        
    }

    return (
        <div  className="flex flex-col bg-card rounded-md mr-1 my-1 w-screen">
            <Header title={title}/>
            <Separator />  
            
            {children}
        </div>
    )
}

export default FeatureLayout