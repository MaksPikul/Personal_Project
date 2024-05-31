"use client"

import { Settings } from "@/actions/settings"
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useTransition, useState } from "react";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SettingsSchema } from "@/schemas";
import { useModal } from "@/hooks/use-modal-store"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input} from "../ui/input";
import { Button } from "../ui/button";
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage, 
} from "../ui/form"


export const AccountModal = () => {
    const [isPending, startTransition] = useTransition()
    const {update, data: session} = useSession()
    const router = useRouter()
    const {isOpen, onClose, type } = useModal();

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>()

    const isModalOpen = isOpen && type === "Account";
    
    
    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(()=>{
            Settings(values)
            .then((data)=>{
                if (data.error){
                    setError(data.error)
                }
                if (data.success) {
                    update()
                    setSuccess(data.success)
                    router.refresh()
                }
            })
        })
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: ""
        }
    })

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="flex flex-col bg-slate-300 ">
            <DialogHeader className="p-64 m-64   bg-green-500">
                account info
            </DialogHeader> 
            <Form {...form}>
                <form>

                </form>
            </Form>
            </DialogContent>
        </Dialog>
    )
   
}

/* <DialogHeader className="pt-8 px-6">

            </DialogHeader> */