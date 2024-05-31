import { Header } from "@/components/protected/header";
import { Separator } from "@/components/ui/separator";

const FeatureLayout = async ({children}:{children: React.ReactNode;}) => {


    return (
        <div  className="flex flex-col bg-gray-400 rounded-md mr-1 my-1  w-full">
            <Header title="feature page"/>
            <Separator className="bg-black"/>  
            {children}
        </div>
    )
}

export default FeatureLayout