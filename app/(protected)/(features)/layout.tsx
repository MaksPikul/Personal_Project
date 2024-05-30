import { Header } from "@/components/protected/header";

const FeatureLayout = async ({children}:{children: React.ReactNode;}) => {


    return (
        <div  className="flex flex-col bg-gray-400 rounded-md mr-1 my-1  w-full">
            <Header title="feature page"/>  
            {children}
        </div>
    )
}

export default FeatureLayout