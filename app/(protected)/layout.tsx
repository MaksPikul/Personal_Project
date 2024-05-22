import { Header } from "@/components/protected/dropdown/header"
import { SideNav } from "@/components/protected/sidenav/sidenav"
import { Main } from "@/components/protected/dropdown/main";



const ProtectedLayout = ({children}:{children: React.ReactNode}) => {

    //probably for dashboard
    
    return(
    <div className="flex flex-col h-full"> 
      <Header />
      <div className="flex flex-row h-full ">
        <SideNav />
        {/*<Main />  could have children a prop to main*/}
        {children}
      </div>
    </div>
    )
}

export default ProtectedLayout;