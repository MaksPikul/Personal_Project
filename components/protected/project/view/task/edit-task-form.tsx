import { Task } from "@prisma/client"
import { useEventListener,useOnClickOutside } from "usehooks-ts";
import { useRef, ElementRef, useTransition, useState, RefObject, } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormError } from "@/components/form-error"
import { UpdateTaskSchema } from "@/schemas"
import { Checkbox } from "@/components/ui/checkbox";
import { X, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { DeleteTask } from "@/actions/delete-task";
import { UpdateTask } from "@/actions/update-task";
import { Input } from "@/components/ui/input"

interface EditTaskFormProps {
    task : Task
    disableTaskEditing: ()=> void;
    setOptimisticTitle : (action: string) => void
}


export const EditTaskForm = ({
    task,
    disableTaskEditing,
    setOptimisticTitle
}:EditTaskFormProps) => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [title, setTitle] = useState(task.title)
    
    
    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const onKeyDown = (e: KeyboardEvent) => {
        if(e.key == "Enter"){
            formRef.current?.requestSubmit()
            
        }
    }
    useEventListener("keydown", onKeyDown)
    useOnClickOutside(formRef, disableTaskEditing)

    const form = useForm<z.infer<typeof UpdateTaskSchema>>({
        resolver: zodResolver(UpdateTaskSchema),
        defaultValues: {
            title:title,
            listId: task.listId,
            id: task.id
        }
    })

    const onSubmit = (values: z.infer<typeof UpdateTaskSchema>) => {
        
        startTransition(()=>{
            
            setOptimisticTitle(values.title)
            UpdateTask(values)
            .then((data) =>{
                if (data?.error){
                    //form.reset();
                    //setError(data?.error)
                }
                else {
                    //setTitle(data.success?.title)
                    disableTaskEditing();
                    form.reset({ 
                        title, 
                        listId: task.listId, 
                        id: task.id 
                    })
                    router.refresh()
                }
            })
        })
    }

    

    return (
        <Form {...form} >
            <form
            onSubmit={form.handleSubmit(onSubmit)}
            
            ref={formRef}>
                <FormField 
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem
                        className="flex flex-col">
                            {/*<FormLabel>Enter group title</FormLabel>*/}
                            <FormControl>
                                <Input 
                                {...field}
                                type="text"
                                disabled={isPending}
                                
                                className={`text-lg w-64 text-red-50 border-transparent border-white h-8`}
                                //ref={inputRef}
                                />
                            </FormControl>
                            {/*<FormMessage className="relative h-8"/>*/}
                        </FormItem>
                    )}/>
                {/*<FormError message={error}/>*/}
            </form>
        </Form>
    )
}