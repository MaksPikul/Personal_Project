import { Header } from "@/components/protected/dropdown/header";

const UserLayout = async ({children}:{children: React.ReactNode;}) => {


    return (
        <div  className="flex flex-col w-full">
            {children}
        </div>
    )
}

export default UserLayout