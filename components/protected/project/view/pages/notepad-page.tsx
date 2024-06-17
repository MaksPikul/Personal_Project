"use client"


interface NotepadProps {
    name: string | undefined
}
export const NotepadPage = ({
    name
}: NotepadProps) => {

    //this component will receive members
    return (
        <div className="">{name}</div>   
    )
}