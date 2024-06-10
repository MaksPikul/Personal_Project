import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    
    DialogFooter,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { LeaveProject } from "@/actions/leave-project";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
    DEFAULT_LOGIN_REDIRECT,
} from "@/routes"


export const LeaveProjectModal = ()=> {
    const {isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "LeaveProject";
    const {project} = data
    const router = useRouter()
    const [isPending, startTransition] = useTransition();

    const onClick = async () =>{
        startTransition(()=>{
            LeaveProject(project?.id)
            onClose();
            router.push(DEFAULT_LOGIN_REDIRECT)
        })
    }

    return(
        <Dialog open={isModalOpen} onOpenChange={()=> onClose()}>
            <DialogContent className=" p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center">
                        Leaving Project
                    </DialogTitle>
                    <DialogDescription className=" text-center">
                        Are you sure you want to leave {project?.name}?
                    </DialogDescription>
                </DialogHeader>
            
            
            <div className="flex flex-row gap-2 justify-center pb-6">
                <Button
                disabled={isPending} 
                onClick={()=>onClick()}>Leave</Button>
                <Button
                disabled={isPending}  
                onClick={()=>onClose()}>Cancel</Button>
            </div>
            
            </DialogContent>
        </Dialog>
    )
}