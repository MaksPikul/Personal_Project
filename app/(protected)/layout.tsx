

import { SideNav } from "@/components/protected/sidenav/sidenav"
import { auth } from "@/auth";
import { getUserMemberships, } from "@/data/project";
import { User, Member} from "@prisma/client";
import { getUserByID } from "@/data/user";
import {  Membership } from "@/types";

const ProtectedLayout = async ({
  children,
}:{
  children: React.ReactNode;
}) => {
  // will need to be adapted later for 
  // const projects = await getSharedProjectsByUserId(user?.id)
  //const project = await getProjectsByUserId(session?.user?.id)
  const session = await auth()
  const user = await getUserByID(session?.user.id)
  const memberships = await getUserMemberships(session?.user?.id)
  

//Session must be fetched here, boards sent over from here, so that sidenav can be "use client"
//<SideNav />

if (!memberships){
  return (
  <p>loading</p>)
}

    return (
      <div className="flex flex-row h-full overflow-hidden">
        <SideNav 
        memberships={memberships as unknown as Membership[]}
        user={user as User}/>
        {children} 
      </div>

    )
}

export default ProtectedLayout;