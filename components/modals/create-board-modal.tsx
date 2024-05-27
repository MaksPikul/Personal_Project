"use client"

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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage, 
} from "../ui/form"


import { useForm } from "react-hook-form"
import * as z from "zod"
import { createBoardSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useEffect, useState, useTransition } from "react"
import { db } from "@/lib/db"
import { CreateBoard } from "@/actions/create-board"
import { useModal } from "@/hooks/use-modal-store"
import { useRouter } from "next/navigation"


export const CreateBoardModal = ()=> {
    const [isPending, startTransition] = useTransition();
    const {isOpen, onClose, type } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "CreateBoard";

    const form = useForm({
        resolver: zodResolver(createBoardSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    });

    const onSubmit = (values: z.infer<typeof createBoardSchema>) => {
        try{
            startTransition(()=>{
                CreateBoard(values)
                form.reset();
                router.refresh()
                onClose();
            })
        }
        catch (error){
            console.log(error)
        }
    }

    // might need to change to transitioning state
    
    const handleClose = () => {
        form.reset();
        onClose();
    }
    
    return(
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-slate-300 p-0 overflow-hidden">
        
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center">
                        Create your board
                    </DialogTitle>
                    <DialogDescription className=" text-center">
                        Create your board yada yada
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="space-y-8">
                        <div className="sapce-y-8 px-6">
                            <div 
                            className="flex items-center justify-center text-center">
                                image upload
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="">
                                            Board Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                            disabled={isPending}
                                            placeholder="Name"
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            
                            />
                        </div>
                        <DialogFooter className="">
                                <Button 
                                disabled={isPending}
                                className=""
                                >
                                    Create
                                </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}