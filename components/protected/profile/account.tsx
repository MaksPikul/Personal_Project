"use client"

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "./profile";
import { UserInfo } from "./user-info";


export const Account = () =>  {
    const {update, data: session} = useSession();

    return (
            <div className="flex flex-row bg-red-700 rounded-t-md p-4 ">
                <Avatar className="h-32 w-32 mx-2">
                    <AvatarImage src={"https://en.wikipedia.org"}/>
                    <AvatarFallback> X </AvatarFallback>
                </Avatar>

                <UserInfo user={session?.user as User} />

            </div>
    )










    /* 
    return(
        <div className=" bg-green-500 h-72 flex m-2 rounded-t-md">
            <div className="flex flex-row">
                

                <div className="flex flex-col">
                    alias
                    <p>some~_name</p>
                    name
                    <p>{session?.user?.name}</p>
                    email
                    <p>{session?.user?.email}</p>

                </div>
                <div className="flex flex-col">
                    <Input />
                    <Input />
                    <Input />
                </div>


            </div>
            <Button disabled={isPending} onClick={()=> onClick()}>

            </Button>
            
            
        
        </div>
    )
    */
}