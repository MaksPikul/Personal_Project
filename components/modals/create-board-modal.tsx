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
    FormField,
    FormItem,
    FormLabel,
    FormMessage, 
} from "../ui/form"


import { useForm } from "react-hook-form"
import * as z from "zod"
import { createProjectSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useTransition } from "react"
import { CreateProject} from "@/actions/create-project"
import { useModal } from "@/hooks/use-modal-store"
import { useRouter } from "next/navigation"
import { FileUpload } from "../file-upload"
import { DeleteFile } from "@/actions/delete-file"


export const CreateBoardModal = ()=> {
    const [isPending, startTransition] = useTransition();
    const {isOpen, onClose, type } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "CreateBoard";

    const form = useForm({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    });

    const onSubmit = (values: z.infer<typeof createProjectSchema>) => {
        try{
            startTransition(()=>{
                CreateProject(values)
                .then((data)=>{
                    form.reset();
                    router.refresh()
                    onClose();
                })
            })
        }
        catch (error){
            console.log(error)
        }
    }

    // might need to change to transitioning state
    
    const handleClose = () => {
        
        DeleteFile(form.getValues().imageUrl)
        form.reset();
        onClose();
    }
    
    return(
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className=" p-0 items-center overflow-hidden">
        
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
                    className="space-y-4 items-center">
                        <div className="space-y-4 px-6 ">
                            <div className="flex items-center justify-center">

                        <FormField
                        control={form.control}
                        name="imageUrl"
                        
                        render={({field}) => (
                            <FormItem>
                                
                                <FormControl className="">
                                    <FileUpload 
                                    endpoint="projectImage"
                                    value={field.value}
                                    onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
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
                        )}/>
                        </div>
                                <div className="flex justify-center pb-6">
                                    <Button 
                                    disabled={isPending}
                                    >
                                    Create
                                    </Button>
                                </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}