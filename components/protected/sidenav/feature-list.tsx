import { Separator } from "@/components/ui/separator"
import { Home, CalendarFold, Clock, BookUser, Plus} from 'lucide-react';
import { SideNavButton } from "./feature-button"
import { CreateProjectButton } from "./create-button"

export const AppFeatures = () =>{
    return(
        <p className="flex-col flex gap-y-1">
            <SideNavButton label="Home" href="/home" icon={<Home />}/>
            <SideNavButton label="Socials" href="/socials" icon={<BookUser />}/>
            <SideNavButton label="Schedule" href="/schedule" icon={<CalendarFold />}/>
            <SideNavButton label="Focus Sessions" href="/focus" icon={<Clock />}/> 
        </p>
    ) 
}