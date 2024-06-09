

import { useParams,} from "next/navigation";
import { BoardCard } from "./board-button"
import { ScrollArea } from "@/components/ui/scroll-area";

import { Membership } from "@/types";
import { MemberRole, User} from "@prisma/client";


interface BoardListProps {
    memberships: Membership[];
    expanded: boolean;
    user: User;
}

export const BoardList = ({
    memberships,
    expanded,
    user
}:BoardListProps) => {
    const params = useParams()

    return(
        <ScrollArea className="flex-1 self-center">
            {memberships?.map((item)=>{

                return(
                    <BoardCard 
                    key={item.project.id}
                    project={item.project}
                    isActive={params.boardId === item.project.id} 
                    expanded={expanded}
                    role={item.role as MemberRole}
                />
                )
            }) }
        </ScrollArea>
    )
}