"use client"

import { Boards, BoardItem } from "./board-button"
import { useParams, usePathname } from "next/navigation";
import { BoardCard } from "./board-button"
import { ScrollArea } from "@/components/ui/scroll-area";


interface BoardListProps {
    boards? : Boards;
}

export const BoardList = ({
    boards,
}:BoardListProps) => {
    const params = useParams()
    console.log(params.boardId)
   

    
    return(
        <>
        <ScrollArea className="flex-1 flex-col flex gap-y-1 ">
            <div className="mx-2">
                {boards?.map((boardItem)=>(
                    <BoardCard 
                    key={boardItem.id}
                    board={boardItem as BoardItem}
                    isActive={params.boardId === boardItem.id} 
                    />
                )) }
            </div> 
        </ScrollArea>
        </>
    )
}