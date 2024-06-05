"use client"

import { AccordionItem , AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { Moon } from "lucide-react";

import Image from "next/image";

export type Boards = {
    id: string,
    name:string | null,
    imgUrl:string | null,
    userId:string,
    createdAt: Date,
    updatedAt: Date,
  }[] | null

  export type BoardItem = {
    id: string,
    name:string | null,
    imgUrl:string | null,
    userId:string,
    createdAt: Date,
    updatedAt: Date,
  }

interface ProjectProps {
    board: BoardItem;
    isActive: boolean;
    expanded: boolean
    //icon: React.ReactNode;
}

export const BoardCard = ({
    board,
    isActive,
    expanded
}:ProjectProps) => {
    const router = useRouter();
    if (!board) {
        return null
    }


    const onClick = () =>{
        router.push(`/boards/${board.id}`)
    }

    const getBoardInitials = () => {
        var parts = board?.name?.split(" ")
        var initials = ''
        if (!parts) {return ""}
        for (var i=0; i<parts?.length; i++) {
            if (parts[i].length > 0 && parts[i] !== '') 
            {
                initials +=  parts[i][0]
            }
        }
        return initials
    }


    return (
        <button 
        onClick={()=>{onClick()}}
        className={`
        relative flex items-center text-start  my-1 p-1 h-14
        font-medium rounded-md cursor-pointer 
        transition-all group ${
        isActive  ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 " 
        : "hover:bg-indigo-50 hover:text-indigo-800" }`}>

            
            {board.imgUrl ? 
            <Image 
            src={board.imgUrl} 
            width={500}
            height={500}
            alt="Upload" 
            className="size-12 rounded-md"/> 
            :
            <div 
            className="size-12 bg-custom rounded-md flex justify-center  items-center">
                 { getBoardInitials() } 
            </div>}
            <div
            className={`overflow-hidden  transition-all  ${
                expanded ? "w-48 ml-2" : "w-0"
            }`}>
            <div>
                <p >{board.name} </p>
                <p className="text-sm">{"Owner | deadline"}</p>
            </div>

            </div>   
        </button>
    )
}