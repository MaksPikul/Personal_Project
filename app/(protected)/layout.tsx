import { Header } from "@/components/protected/dropdown/header"
import { SideNav } from "@/components/protected/sidenav/sidenav"

const ProtectedLayout = async ({children}:{children: React.ReactNode}) => {
  
  
    return (
      <div className="flex flex-row h-full">
        <SideNav />
        {children} 
      </div>

    )
}

export default ProtectedLayout;