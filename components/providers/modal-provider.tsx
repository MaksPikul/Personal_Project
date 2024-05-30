"use client"

import { CreateBoardModal } from "@/components/modals/create-board-modal"
import { useEffect, useState } from "react"
import { SignOutModal } from "../modals/signout-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
       setIsMounted(true) 
    },[])

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <CreateBoardModal />
            <SignOutModal />
        </>
    )
}