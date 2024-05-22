"use client"

interface ProjectProps {
    label: string;
    href: string;
    //icon: React.ReactNode;
}

export const ProjectCard = ({
    label,
    href,
    //icon
}:ProjectProps) => {

    const onClick = () =>{

    }

    return(
        <button className="rounded-md m-4 p-3 flex flex-row justify-around hover:bg-slate-100" onClick={()=>{onClick()}}>
            {/*icon*/}
            <div id="thumbnail" className="size-14 text-center rounded-full bg-rose-600">PH</div>
            {label}
        </button>
    )
}