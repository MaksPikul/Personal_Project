
import { Account } from "@/components/protected/profile/account"

import { SettingsForm } from "@/components/protected/profile/settings"
import { ScrollArea } from "@/components/ui/scroll-area";
import { SessionProvider, useSession } from "next-auth/react";

export const UserPage = () =>{

    return (
        <div className=" bg-card overflow-auto  mr-1 my-1 w-full flex flex-col justify-center items-center rounded-md">
            <div className='bg-purple-500  p-4 max-h-3/8'>

            <p className="text-xl m-2">Account</p>
            <Account />

            <div className="bg-green-500">User Info / Mutual associates / Mutual Projects|Team</div>
            <div className="bg-yellow-500">Last Worked On Project / Completed projects showcase</div>
            <div className="bg-blue-500">Activity History</div>

            <p className="text-xl m-2 p sticky">Settings</p>
            <ScrollArea className="flex-1" >
                <SettingsForm />
            </ScrollArea>

            </div>
        </div>
    )
}