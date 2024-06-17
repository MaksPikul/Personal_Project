"use client"

import { FormInput } from "@/components/form/form-input"
import { Plus, X } from "lucide-react"
import { useParams } from "next/navigation"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { useState, useRef, ElementRef, useTransition} from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormError } from "@/components/form-error"

import { CreateListSchema } from "@/schemas"
import { createList } from "@/actions/create-list"

interface NewListButtonProps {
    projectId: string
}

export const NewListButton = ({
    projectId
}:NewListButtonProps) => {   
    const params = useParams()
    
    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState<string | undefined>("");
    
   
    const [isPending, startTransition] = useTransition();

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const enableEditing = () => {
        
        setIsEditing(true)
        setTimeout(()=>{
            inputRef.current?.focus();
            inputRef.current?.select();
        })
    }

    const disableEditing = () => {
        setIsEditing(false)
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if(e.key == "Escape"){
            //setIsEditing(false)
            formRef.current?.requestSubmit()
        }
    }
    useEventListener("keydown", onKeyDown)
    useOnClickOutside(formRef, disableEditing)

    const form = useForm<z.infer<typeof CreateListSchema>>({
        resolver: zodResolver(CreateListSchema),
        defaultValues: {
            title:"",
            projectId: params.boardId
        }
    })

    const onSubmit = (values: z.infer<typeof CreateListSchema>) => {
        
        console.log("here")

        startTransition(()=>{
            createList(values)
            .then((data) =>{
                if (data?.error){
                    form.reset();
                    setError(data?.error)
                }
                else {
                    disableEditing();
                    form.reset();
                }
                
            })
        })
    }



    if (isEditing){
        return(
            <Form {...form} >
            <form
            onSubmit={form.handleSubmit(onSubmit)}
            ref={formRef}>
                
                <FormField 
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            {/*<FormLabel>Enter group title</FormLabel>*/}
                            <FormControl>
                                <Input 
                                {...field}
                                disabled={isPending}
                                placeholder="Enter Group title"
                                defaultValue=""
                                //ref={inputRef}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                

                <FormError message={error } />
                <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full">
                    add
                </Button>

                <Button 
                onClick={disableEditing}>
                    <X className="size-5" />
                </Button>

                
                
            </form>
        </Form>
        )
    }
    else {

        return (
            
                <button 
                onClick={enableEditing}
                className="">
                    <Plus />
                    Add a group
                </button>
        
        )
}
}
