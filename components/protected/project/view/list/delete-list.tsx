
import { List } from "@prisma/client";
import { Trash2 } from "lucide-react"
import { useTransition } from "react"
import { DeleteList } from "@/actions/lists/delete-list";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

interface DeleteListProps {
    list : List
}

export const DeleteListButton = ({
    list
}:DeleteListProps) => {
    const { onOpen } = useModal()
    // Onclick for now, make it a modal with confirms
    

    return (
        <button
        onClick={()=>onOpen("DeleteList", {list:list})}
        className="">
                <Trash2 />
        </button>
    )
}