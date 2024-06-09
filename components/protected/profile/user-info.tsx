import { User } from "@prisma/client"

interface UserInfoProps {
    user: User
}


export const UserInfo = ({
    user
}:UserInfoProps) => {
    return (
        <>
            <div className=" p-2 flex flex-col gap-y-1 bg-red-300 rounded-l-md justify-start ">
                Alias:
                <p className="">{"some username"}</p>
                Name:
                <p className="">{user?.name}</p>
                Email:
                <p className="">{user?.email}</p>
            </div>
                
            <div className="p-2  flex flex-col gap-y-1 bg-red-300 rounded-r-md justify-start items-center">
                Time spent focused:
                <p className="">{"int"}</p>
                Daily focused streak:
                <p className="">{"int"}</p>
                Projects Completed: 
                <p className="">{"int"}</p>
            </div>
        </>
    )
}