
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "../ui/form"
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useTransition , useState } from "react";
import { DeleteList } from "@/actions/lists/delete-list";


export const DeleteListModal = ()=> {
    const {isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "DeleteList";
    const {list} = data
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");
    

    const onClick = () => {
        startTransition(()=>{
            DeleteList(list)
            .then((data) =>{
                if (data?.error){
                    //setError(data?.error)
                    //toast errors
                    
                }
                else {
                    onClose()
                    router.refresh()
                }
            })
        })
    }

    return(
        <Dialog open={isModalOpen} onOpenChange={()=> onClose()}>
            <DialogContent className=" p-0 overflow-hidden justify-center">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center mb-3">
                        Deleting List
                    </DialogTitle>
                    <DialogDescription className="text-secondary p-2 text-center">
                        <p>Are you sure you want to delete the list <b><u>{list?.title}</u></b> ?</p>
                        
                        <p>This action cannot be undone.</p>
                    </DialogDescription>
                </DialogHeader>
                
                <div className="flex flex-row gap-2 justify-center pb-6">
                    <Button 
                    onClick={()=>onClick()}
                    disabled={isPending}>Delete</Button>
                    <Button onClick={()=>onClose()}>Keep</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}