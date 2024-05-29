import { SideNav } from "@/components/protected/sidenav/sidenav"

const ProtectedLayout = ({
  children,
}:{
  children: React.ReactNode;
}) => {
  

    return (
      <div className="flex flex-row h-full justify-between">
        <SideNav />
        {children} 
      </div>

    )
}

export default ProtectedLayout;