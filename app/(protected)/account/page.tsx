import { auth } from "@/auth"
import { Account } from "@/components/protected/account"
import { User } from "@/components/protected/profile/profile"
import { SettingsForm } from "@/components/protected/settings"
import { SessionProvider, useSession } from "next-auth/react";

export const AccountPage = () => {
    

    return(
        <div className=" overflow-hidden bg-gray-400 mr-1 mt-1 w-full flex flex-col items-center rounded-md  ">
            
            <Account />
            <SettingsForm />
            
        </div>
    )
}

export default AccountPage 