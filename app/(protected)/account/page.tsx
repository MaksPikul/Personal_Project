import { Account } from "@/components/protected/account"
import { Settings } from "@/components/protected/settings"

const AccountPage = () => {
    

    return(
        <div className=" bg-gray-400 rounded-t-md mr-1 mt-1  w-full">
            <Account />
            <Settings />
        </div>
    )
}

export default AccountPage