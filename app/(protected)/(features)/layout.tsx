import { Header } from "@/components/protected/header";
import { Separator } from "@/components/ui/separator";


const FeatureLayout = async ({children}:{children: React.ReactNode;}) => {
    

    return (
        <div  className="flex flex-col bg-card rounded-md mr-1 my-1 w-screen">
            <Header title={""}/>
            <Separator />  
            
            {children}
        </div>
    )
}

export default FeatureLayout