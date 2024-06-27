
import { Member, User } from "@prisma/client"


interface MemberCardProps {
    member: (Member&{user: User})[]
}

export const MemberCard = ({
    member
}:MemberCardProps) => {
    
    //array of cards, on the left, header and once user is chosen, actions for that user show up

    return (
        <div className="bg-red-500">
            {member.name} l
        </div>
    )
}