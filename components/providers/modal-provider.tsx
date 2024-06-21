"use client"

import { CreateBoardModal } from "@/components/modals/create-board-modal"
import { useEffect, useState } from "react"
import { SignOutModal } from "../modals/signout-modal";
import { InviteModal } from "../modals/invite-modal";
import { LeaveProjectModal } from "../modals/leave-project-modal";
import { DeleteProjectModal } from "../modals/delete-project-modal";
import { DeleteListModal } from "../modals/delete-list-modal";


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
            <InviteModal />   
            <LeaveProjectModal />
            <DeleteProjectModal />
            <DeleteListModal />
        </>
    )
}