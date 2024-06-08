"use client"

import { Header } from "@/components/protected/header";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";


const FeatureLayout = ({children}:{children: React.ReactNode;}) => {
    const {data: session} = useSession()
    
    

    return (
        <div  className="flex flex-col bg-card rounded-md mr-1 my-1 w-screen">
            <Header/>
            <Separator className="bg-card-foreground"/> 
            {children}
        </div>
    )
}

export default FeatureLayout