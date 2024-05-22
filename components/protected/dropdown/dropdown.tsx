import { ProfileOptions } from "./profile-options"
import { ProfileCard } from "./profile-card"


export const DropDown = () => {
    
    return (
    <div className="pt-3 bg-red-500 m-2 w-64 flex flex-col border-solid border-2 rounded-md border-purple-500">
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
        <ProfileOptions 
            label="Sign Out"
        />
        <ProfileOptions 
        label="Dark/Light Mode"
        />
        </div>
    </div>
    )
}