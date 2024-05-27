import { Header } from "@/components/protected/dropdown/header"
import { SideNav } from "@/components/protected/sidenav/sidenav"
import { Main } from "@/components/protected/dropdown/main";

import { auth, signOut } from '@/auth'
import { Profile } from "@/components/protected/dropdown/profile";
import { CreateBoardModal } from "@/components/modals/create-board-modal";
import { getBoardByUserId } from "@/data/hobbies";
import { Boards,} from "@/components/protected/sidenav/project-card";






const ProtectedLayout = async ({children}:{children: React.ReactNode}) => {

  const session = await auth()
  const boards = await getBoardByUserId(session?.user?.id)
    //probably for dashboard

    
    return(
    <div id="body" className="flex flex-col h-full"> 
    
      <div id="header" className="flex flex-row h-16 justify-between w-full">
        <Header />
        <Profile />
        
      </div>
      
      <div className="flex flex-row h-full">
        
        <SideNav boards={boards as Boards}/>
        {children} 
      </div>
    </div>
    )
}

export default ProtectedLayout;