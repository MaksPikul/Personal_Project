import { Avatar , AvatarFallback , AvatarImage } from "@/components/ui/avatar"

interface CardProps {
    name: string;
    email: string;
}

export const ProfileCard = ({
    name,
    email,
}:CardProps) => {

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
}