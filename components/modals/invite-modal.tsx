

import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Copy, RefreshCw, Check } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios"


export const InviteModal = () => {
    
    const {isOpen, onOpen, onClose, type, data } = useModal();
    const origin = useOrigin()
    const { project } = data;

    const [copied, setCopied] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true)

        setTimeout(()=>{
            setCopied(false)
        }, 1000)
    }

    const onGenerateNew = async () => {
        try{
            setIsLoading(true)
            const res = await axios.patch(`/api/projects/${project?.id}/invite-code`) 
            onOpen("invite", {project: res.data})
        }
        catch (error){
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    const isModalOpen = isOpen && type === "invite";
    //NEED to add inviteCode into database and when creating project
    const inviteUrl = `${origin}/invite/${project?.inviteCode}`

    return(
        <Dialog open={isModalOpen} onOpenChange={()=> onClose()}>
            <DialogContent className=" p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-center">
                    Invite Associates
                </DialogTitle>
            </DialogHeader>
            
            
            <div className="flex flex-col p-3  gap-2 justify-center pb-6">
                <div className="p-4">
                    <Label 
                    htmlFor="search">Invite to project through email</Label>
                    <Input 
                    placeholder="Enter email..."
                    className="bg-secondary text-primary"></Input>
                </div>
                
                <div 
                className="p-4">
                    <Label>Invite to project through link</Label>
                    <div className="flex items-center gap-x-2">
                        
                        <Input
                        className="border-0 bg-secondary text-primary"
                        disabled={isLoading}
                        value={inviteUrl}
                        />

                        <Button 
                        disabled={isLoading}
                        size="icon"
                        onClick={onCopy}>
                            {copied 
                            ?<Check />
                            : <Copy />}
                        </Button>
                    </div>
                </div>

                <Button
                disabled={isLoading}
                onClick={onGenerateNew}
                className="self-center w-64">
                    Generate a new link
                    <RefreshCw />
                </Button>
                
            </div>
            
            </DialogContent>
        </Dialog>
    )
}