"use client"


interface KanbanProps {
    name: string | undefined
}
export const KanbanPage = ({
    name
}: KanbanProps) => {

    //this component will receive members
    return (
        <div className="">{name}</div>   
    )
}