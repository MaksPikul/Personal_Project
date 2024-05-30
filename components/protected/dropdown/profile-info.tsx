import { Avatar , AvatarFallback , AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface ProfileInfoProps {
    name: string | undefined;
    email: string | undefined;
    imgUrl: string | null | undefined;
}

export const ProfileInfo = ({
    name,
    email,
    imgUrl
}:ProfileInfoProps) => {

        return(
                <div className="flex flex-col items-center gap-y-2">
                    
                    <Avatar className="border-2 border-black size-20">
                        <AvatarImage src={"imgUrl"} className="size-sm"/>
                        <AvatarFallback> P </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex flex-col items-center justify-center">
                        <p className="font-bold text-md">{name}</p>
                        <p className="text-sm">{email}</p>
                    </div>
                    <Separator className="bg-black"/>
                    <div className="flex flex-row justify-center ">
                        <div className="bg-green-500 size-24 p-1 m-1 rounded-full"> 
                            Hours Studied (circle indicator)
                        </div>
                        <div className="bg-green-500 size-24 p-1 m-1 rounded-md"> 
                            P's Completed <br />
                            T's Completed
                        </div>
                    </div>
                    <Separator className="bg-black"/>
                </div>
                
            
        )

    /*
    return (
        <div className="flex flex-col ">
            <div className="flex justify-center">
            <Avatar >
                <AvatarImage src="increase this size"/>
                <AvatarFallback> P </AvatarFallback>
            </Avatar>
            </div>

            <div className="flex m-2 flex-col relative text-center">
                <p >{name}</p>
                <p >{email}</p>
            </div>

            <div className="flex flex-row justify-center ">
                <div className="bg-green-500 size-24 p-1 m-1"> 
                    Hours Studied (circle indicator)
                </div>
                <div className="bg-green-500 size-24 p-1 m-1"> 
                    P's Completed <br />
                    T's Completed
                </div>
            </div>
        </div>
    )
    */
}