

import { SideNav } from "@/components/protected/sidenav/sidenav"
import { auth } from "@/auth";
import { getBoardsByUserId } from "@/data/hobbies";
import { Boards } from "@/components/protected/sidenav/board-button";
import { User } from "@/components/protected/profile/profile";

const ProtectedLayout = async ({
  children,
}:{
  children: React.ReactNode;
}) => {
  const session= await auth()
  const user = session?.user
  const boards = await getBoardsByUserId(user?.id)

//Session must be fetched here, boards sent over from here, so that sidenav can be "use client"
//<SideNav />
    return (
      <div className="flex flex-row h-full overflow-hidden">
        
        <SideNav boards={boards as Boards} user={user as User}/>
        {children} 
      </div>

    )
}

export default ProtectedLayout;