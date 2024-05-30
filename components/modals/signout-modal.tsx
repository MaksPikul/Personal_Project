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
import { signOut } from "next-auth/react";

export const SignOutModal = ()=> {
    const {isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === "signOut";

    return(
        <Dialog open={isModalOpen} onOpenChange={()=> onClose()}>
            <DialogContent className="bg-slate-300 p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center">
                        Confirm Sign-out
                    </DialogTitle>
                    <DialogDescription className=" text-center">
                        Are you sure you want to sign out?
                    </DialogDescription>
                </DialogHeader>
            
            <div className="flex flex-col gap-2 items-center m-2">
                <Button onClick={()=>signOut()}>Sign out</Button>
                <Button onClick={()=>onClose()}>Stay</Button>
            </div>
            </DialogContent>
        </Dialog>
    )
}