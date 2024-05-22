import { SideNavButton } from "./sidenav-button"
import { ProjectCard } from "./project-card"
import { CreateProject } from "./create-project"
import { IoHomeSharp } from "react-icons/io5";

export const SideNav = () => {

    return(
        <div className="w-64 bg-red-500 h-full flex flex-col">
            <div id="features" className=" border-b border-solid border-black">
                <SideNavButton label="Home" href="/" icon={<IoHomeSharp />}/>
                <SideNavButton label="Socials" href="/" icon={<IoHomeSharp />}/>
                <SideNavButton label="Schedule" href="/" icon={<IoHomeSharp />}/>
                <SideNavButton label="Focus Sessions" href="/" icon={<IoHomeSharp />}/>
            </div>
            
            <div id="projects" className="flex flex-col place-content-end">
                <ProjectCard label="Project Name" href="/" />
                <CreateProject href="/"/>
            </div>
        </div>
    )
}