"use client"

import { AccordionItem , AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import Link from "next/link";

export type Boards = {
    id: string,
    name:string | null,
    imageUrl:string | null,
    userId:string,
    createdAt: Date,
    updatedAt: Date,
  }[] | null

  export type BoardItem = {
    id: string,
    name:string | null,
    imageUrl:string | null,
    userId:string,
    createdAt: Date,
    updatedAt: Date,
  }

interface ProjectProps {
    board: BoardItem;
    isActive: boolean;
    //icon: React.ReactNode;
}

export const BoardCard = ({
    board,
    isActive,
}:ProjectProps) => {
    const router = useRouter();
    const onClick = (href: string) =>{
        router.push(`/boards/${board.id}`)
    }
    
    if (!board) {
        return null
    }
    
//className="flex-row flex rounded-md gap-6 p-3 m-0 w-full hover:bg-slate-300"
    return (
        <button 
        className={`py-2 px-1 mx-1 items-center flex-row text-md flex w-60 rounded-md 
        transition duration-200 hover:bg-slate-300
        ${isActive  ? 'bg-red-200' : ''}`}
        onClick={()=>{onClick(board.id)}}>
                <div className="bg-green-500 rounded-md size-14 mr-3 "></div>
            <div className="flex flex-col items-start text-nowrap">
                <p >{board.name}</p>
                <p className="text-sm">{"board type"}</p>
            </div>
        </button>
    )
}