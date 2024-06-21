"use client"


import { List } from "@prisma/client"

import { useState, useRef, ElementRef, useTransition } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormError } from "@/components/form-error"
import { UpdateListSchema } from "@/schemas"
import { useParams, useRouter } from "next/navigation"
import { UpdateList } from "@/actions/update-list"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"




interface EditListTitleProps {
    data: List
}

export const EditListTitle = ({
    data
}:EditListTitleProps) => {
    const params = useParams()
    const router = useRouter()

    const [title, setTitle] = useState(data.title)
    
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
        form.reset({ 
            title, 
            projectId: params.boardId, 
            id: data.id 
        })
    }
    const onKeyDown = (e: KeyboardEvent) => {
        if(e.key == "Enter"){
            formRef.current?.requestSubmit()
        }
    }
    useEventListener("keydown", onKeyDown)
    useOnClickOutside(formRef, disableEditing)

    const form = useForm<z.infer<typeof UpdateListSchema>>({
        resolver: zodResolver(UpdateListSchema),
        defaultValues: {
            title:title,
            projectId: params.boardId,
            id: data.id
        }
    })

    const onSubmit = (values: z.infer<typeof UpdateListSchema>) => {
        if( values.title === title){
            return disableEditing()
        }
        startTransition(()=>{
            UpdateList(values)
            .then((data) =>{
                if (data?.error){
                    form.reset();
                    setError(data?.error)
                    //toast errors
                }
                else {
                    setTitle(data.success.title)
                    disableEditing();
                    router.refresh()
                }
            })
        })
    }

    return(
        <>
        {isEditing ? 
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
                                    defaultValue={title}
                                    className={`text-lg w-96 text-red-50 border-transparent border-white h-8`}
                                    ref={inputRef}
                                    />
                                </FormControl>
                                {/*<FormMessage className="relative h-8"/>*/}
                            </FormItem>
                        )}/>
                    
                    <FormError message={error}/>
                </form>
            </Form>
                :
            <button 
            className="h-8 items-center text-lg flex hover:border rounded-md px-3"
            onClick={()=>enableEditing()}>
                {title}
            </button>
            }
        </>
    )
}