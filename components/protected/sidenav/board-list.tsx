"use client"

import { Boards, BoardItem } from "./board-button"
import { useParams, usePathname } from "next/navigation";
import { BoardCard } from "./board-button"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";


interface BoardListProps {
    boards? : Boards;
    expanded: boolean
}

export const BoardList = ({
    boards,
    expanded
}:BoardListProps) => {
    const params = useParams()
    console.log(params.boardId)
    
    return(
        
        <ScrollArea className="flex-1 self-center">
            {boards?.map((boardItem)=>(
                <BoardCard 
                key={boardItem.id}
                board={boardItem as BoardItem}
                isActive={params.boardId === boardItem.id} 
                expanded={expanded}
                />
            )) }
        </ScrollArea>
        
        
    )
}