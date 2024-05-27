import { Separator } from "@/components/ui/separator"
import { Home, CalendarFold, Clock, BookUser, Plus} from 'lucide-react';
import { SideNavButton } from "./sidenav-button"
import { CreateProjectButton } from "./create-project"

export const SNFeatures = () =>{
    return(
        <div className=" space-y-2  p-3">
                <SideNavButton label="Home" href="/home" icon={<Home />}/>
                <SideNavButton label="Socials" href="/socials" icon={<BookUser />}/>
                <SideNavButton label="Schedule" href="/schedule" icon={<CalendarFold />}/>
                <SideNavButton label="Focus Sessions" href="/focus" icon={<Clock />}/>
                <Separator className="bg-black"/>
                <CreateProjectButton label="Create Hobby" icon={<Plus />} />
                <Separator className="bg-black"/>
            </div>
    )
}