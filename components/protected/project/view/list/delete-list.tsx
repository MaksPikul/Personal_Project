
import { List } from "@prisma/client";
import { Trash2 } from "lucide-react"
import { useTransition } from "react"
import { DeleteList } from "@/actions/lists/delete-list";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

interface DeleteListProps {
    list : List
}

export const DeleteListButton = ({
    list
}:DeleteListProps) => {
    const { onOpen } = useModal()
    // Onclick for now, make it a modal with confirms
    

    return (
        <Button
        onClick={()=>onOpen("DeleteList", {list:list})}
        className=""
        variant="ghost">
                <Trash2 />
        </Button>
    )
}