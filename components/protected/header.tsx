import { usePathname } from "next/navigation";




export const Header = () => {
    const path = usePathname()
    const title = path[1].toUpperCase() + path.substring(2);

    

    return (
        <header  className="items-center rounded-t-md p-0 bg-header text-l font-bold flex flex-row ">
            <div className=" h-14 py-3 items-center flex pl-4 truncate w-60 rounded-tl-md border-r border-card-foreground">
                {title + " Dashboard"} 
            </div>
        </header>
    )

}