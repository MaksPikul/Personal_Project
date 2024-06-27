
import { List } from "@prisma/client";
import { Trash2 } from "lucide-react"
import { useTransition } from "react"
import { DeleteList } from "@/actions/lists/delete-list";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface DeleteListProps {
    list : List,
    roles: {
        isAdmin:boolean,
        isMod:boolean
    }
}

export const DeleteListButton = ({
    list,
    roles
}:DeleteListProps) => {
    const { onOpen } = useModal()
    // Onclick for now, make it a modal with confirms
    

    return (
        <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
                <Button
                disabled={!(roles?.isMod)}
                onClick={()=>onOpen("DeleteList", {list:list})}
                className=""
                variant="ghost">
                        <Trash2 />
                </Button>
            </TooltipTrigger>

            
            {(roles?.isMod) ?
                null
                :
                <TooltipContent>
                    <p>Cannot delete list as member</p>
                </TooltipContent>
            }
        </Tooltip>
    )
}