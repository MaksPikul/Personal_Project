import { Header } from "@/components/protected/dropdown/header";

const BoardLayout = ({children}:{children: React.ReactNode;}) => {


    return (
        <div className="flex flex-col w-full">
            <Header />  
            {children}
        </div>
    )
}

export default BoardLayout