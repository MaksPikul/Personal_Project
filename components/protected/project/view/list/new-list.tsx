"use client"

import { Check, Plus, X } from "lucide-react"
import { useParams } from "next/navigation"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useState, useRef, ElementRef, useTransition, useOptimistic, useContext} from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormError } from "@/components/form/form-error"

import { CreateListSchema } from "@/schemas"
import { createList } from "@/actions/lists/create-list"
import { useRouter } from "next/navigation"

import { v4 as uuidV4 } from "uuid"
import { ListWithCards } from "@/types"
import { roleContext } from "../../project-header"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

export const NewListButton = () => {   
    const params = useParams()
    const router = useRouter();
    const role = useContext(roleContext)
    
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
        form.reset();
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if(e.key == "Enter"){
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

        startTransition(()=>{
            const listToAdd = {
                id: uuidV4(),
                title: values.title,
                order: 1,
                projectId: "0f9ffede-3275-4b0a-acfb-5db2cf941b4f",
                createdAt: new Date(Date.now()),
                updatedAt: new Date(Date.now()),
            }

            //addOptimisticLists({...listToAdd,tasks:[]})
            createList(values, listToAdd)
            .then((data) =>{
                if (data?.error){
                    form.reset();
                    setError(data?.error)
                }
                else {
                    disableEditing();
                    router.refresh()
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
                <div className="flex flex-row rounded-md border-white border border-solid items-center transition-all h-8 w-64">
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
                                disabled={isPending}
                                
                                defaultValue=""
                                className="rounded-r-none border-transparent border-white h-8"
                                //ref={inputRef}
                                />
                            </FormControl>
                            {/*<FormMessage className="relative h-8"/>*/}
                        </FormItem>
                    )}/>
                
                <Button
                    disabled={isPending}
                    type="submit"
                    className="bg-green-600 relative hover:bg-green-700 border-y rounded-none h-8">
                    <Check className="size-3.5"/>
                </Button>

                <Button 
                onClick={disableEditing}
                className="bg-red-600 hover:bg-red-700 border-y border-white rounded-l-none h-8">
                    <X className="size-3.5" />
                </Button>
                <FormError message={error }/>
                </div>
                
            </form>
        </Form>
        )
    }
    else {

        return (
            <TooltipProvider delayDuration={100} >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button 
                        onClick={enableEditing}
                        disabled={!(role?.isAdmin || role?.isMod)}
                        className={` ${!(role?.isAdmin || role?.isMod) && "bg-green-900 opacity-50 "}
                        w-64 gap-x-4  transition-all flex flex-row rounded-md 
                        bg-green-600 hover:bg-green-700 justify-center items-center`}>
                            <p>Add List</p>
                            <Plus />
                        </button>
                    </TooltipTrigger>
                    {!(role?.isAdmin || role?.isMod) ?
                    <TooltipContent >
                        <p>Cannot create list as member</p>
                    </TooltipContent>
                    :null
                    }
                </Tooltip>
            </TooltipProvider>
        )
}
}
