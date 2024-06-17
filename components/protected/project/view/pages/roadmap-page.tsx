"use client"


interface RoadmapProps {
    name: string | undefined
}
export const RoadmapPage = ({
    name
}: RoadmapProps) => {

    //this component will receive members
    return (
        <div className="">{name}</div>   
    )
}