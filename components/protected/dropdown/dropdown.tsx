import { ProfileOptions } from "./profile-options"
import { ProfileCard } from "./profile-card"
import { auth, signOut } from '@/auth'
import { SignOut } from "@/actions/signout"

export const DropDown = () => {
    const onSubmit = {

    }

    return (
    <div className="pt-3 bg-red-500 m-2 w-64 relative flex-col border-solid border-2 rounded-md border-purple-500">
        <ProfileCard
        name="Maks Pikul"
        email="mmaks522@gmail.com"
        />
        
        <div className="border-solid border-purple-500 border-t-2 mt-4 ">
        <ProfileOptions
            //icon
            //href
            label="Account"
            />
       
            <form action={() =>{
                SignOut()
            }}>
                <button type="submit">
                    sign out
                </button>
            </form>
        
        
        <ProfileOptions 
        label="Dark/Light Mode"
        />

        </div>
    </div>
    )
}