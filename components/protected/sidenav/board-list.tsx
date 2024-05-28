"use client"

import { Boards, BoardItem } from "./board-button"
import { Accordion } from "@/components/ui/accordion";
import { useLocalStorage } from "usehooks-ts"
import { BoardCard } from "./board-button"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface BoardListProps {
    storageKey: string;
    boards? : Boards;
}

export const BoardList = ({
    storageKey = "nav-state",
    boards
}:BoardListProps) => {

    const activeHobby = "2"

    
    return(
        <>
        <ScrollArea className="flex-1 flex-col flex gap-y-1 ">
            <div className="mx-2">
                {boards?.map((boardItem)=>(
                    <BoardCard 
                    key={boardItem.id}
                    board={boardItem as BoardItem}
                    isActive={activeHobby === boardItem.id} 
                    />
                )) }
            </div> 
        </ScrollArea>
        </>
    )
}