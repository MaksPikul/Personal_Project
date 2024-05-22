"use client"

interface ButtonProps {
    label: string;
    href: string;
    icon: React.ReactNode;
}

export const SideNavButton = ({
    label,
    href,
    icon
}:ButtonProps) => {

    const onClick = () =>{

    }

    return(
        <button className="text-left align-center justify-evenly flex-row flex rounded-md m-3 p-2 hover:bg-slate-100" onClick={()=>{onClick()}}>
            <div>{icon}</div>
            {label}
        </button>
    )
}