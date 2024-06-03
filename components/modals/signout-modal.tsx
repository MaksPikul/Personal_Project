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
            <DialogContent className=" p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center">
                        Confirm Sign-out
                    </DialogTitle>
                    <DialogDescription className=" text-center">
                        Are you sure you want to sign out?
                    </DialogDescription>
                </DialogHeader>
            
            
            <div className="flex flex-row gap-2 justify-center pb-6">
                <Button onClick={()=>signOut()}>Sign out</Button>
                <Button onClick={()=>onClose()}>Stay</Button>
            </div>
            
            </DialogContent>
        </Dialog>
    )
}