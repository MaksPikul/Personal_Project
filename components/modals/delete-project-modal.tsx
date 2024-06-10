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
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { DeleteProject } from "@/actions/delete-project";


import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { DeleteProjectSchema } from "@/schemas"

import {
    DEFAULT_LOGIN_REDIRECT,
} from "@/routes"


export const DeleteProjectModal = ()=> {
    const {isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "DeleteProject";
    const {project} = data
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>("");

    const form = useForm<z.infer<typeof DeleteProjectSchema>>({
        resolver: zodResolver(DeleteProjectSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = (values: z.infer<typeof DeleteProjectSchema>) =>{
        setError("")

        startTransition(()=>{
            DeleteProject(project, values)
            .then((data)=>{
                if (data?.error){
                    form.reset();
                    setError(data?.error)
                }
                else {
                    onClose();
                    router.push(DEFAULT_LOGIN_REDIRECT)
                }
            })
        })
    }


    return(
        <Dialog open={isModalOpen} onOpenChange={()=> onClose()}>
            <DialogContent className=" p-0 overflow-hidden justify-center">
            <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center mb-3">
                        Deleting Project
                    </DialogTitle>
                    <DialogDescription className="text-secondary p-2  rounded-md bg-yellow-500 text-center">
                        <p>Are you sure you want to leave <b><u>{project?.name}</u></b> ?</p>
                        
                        <p>This action cannot be undone.</p>
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 ">
                    <FormField 
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enter Project Name</FormLabel>
                            <FormControl>
                                <Input 
                                {...field}
                                disabled={isPending}
                                
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <FormError message={error} />
                    <div className="flex flex-row gap-2 justify-center pb-6">
                        <Button
                        className="bg-red-600 hover:bg-red-700 "
                        disabled={isPending} 
                        type="submit">Delete</Button>
                        <Button
                        disabled={isPending}  
                        onClick={()=>onClose()}>Cancel</Button>
                    </div>
                </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}