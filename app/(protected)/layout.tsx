import { Header } from "@/components/protected/dropdown/header"
import { SideNav } from "@/components/protected/sidenav/sidenav"
import { Main } from "@/components/protected/dropdown/main";

import { auth, signOut } from '@/auth'
import { Profile } from "@/components/protected/dropdown/profile";
import { CreateBoardModal } from "@/components/modals/create-board-modal";



const ProtectedLayout = async ({children}:{children: React.ReactNode}) => {

  const session = await auth()
    //probably for dashboard
    
    return(
    <div id="body" className="flex flex-col h-full"> 
    
      <div id="header" className="flex flex-row h-16 justify-between w-full">
        <Header />
        <Profile />
        
      </div>
      
      <div className="flex flex-row h-full">
        
        <SideNav />
        {children} 
      </div>
    </div>
    )
}

export default ProtectedLayout;