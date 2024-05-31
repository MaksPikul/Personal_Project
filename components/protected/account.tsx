"use client"

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export const Account = () =>  {
    const {update, data: session} = useSession();

    return (
        <div className='bg-purple-500  p-5 m-5 '>
            <div className="flex flex-row bg-red-500 p-4">
                <Avatar className="h-32 w-32 ">
                    <AvatarImage src={"https://en.wikipedia.org"}/>
                    <AvatarFallback> X </AvatarFallback>
                </Avatar>
                <div className="flex flex-col bg-red-100 justify-start p-4">
                    <p className="">{session?.user.name}</p>
                    <p className="">{session?.user.email}</p>
                    <p className="">{"some other things"}</p>
                </div>
                <div className="flex flex-col bg-red-300 p-4">
                    <p className="">{"Time spent focused: "}</p>
                    <p className="">{"Daily focused streak: "}</p>
                    <p className="">{"Projects Completed: "}</p>
                </div>
            </div>

                <div className="bg-green-500">
                    User Info / Mutual associates / Mutual Projects|Team
                </div>

                <div className="bg-yellow-500">
                    Last Worked On Project / Completed projects showcase
                </div>

                <div className="bg-blue-500">
                    Activity History
                </div>
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