import { useModal } from "@/hooks/use-modal-store";
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { UseAction } from "@/hooks/use-action";
import { MemberCard } from "../protected/profile/member-card";


export const ManageMemberModal = () => {
    const {isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "ManageMembers";

    const { members } = data

    

    /*
    const {execute, fieldErrors, isLoading} = UseAction(UpdateMember, {
        onSuccess(data) {
            onClose();
        },
        onError(error) {
            console.log(error)
        },
    });
    */

    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}>

            <DialogContent className=" m-0 p-0 items-center overflow-hidden flex flex-row">

                <div>
                    {members?.map((member)=>
                        <MemberCard member={member.user}/>
                    )}
                </div>
                

                <DialogHeader className="">
                    <DialogTitle className="text-center">
                        Create your board
                    </DialogTitle>
                    <DialogDescription className=" text-center">
                        Create your board yada yada
                    </DialogDescription>
                </DialogHeader>

            </DialogContent>
        </Dialog>
    )
}