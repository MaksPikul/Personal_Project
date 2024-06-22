
import { Row } from "@tanstack/react-table";
import { Button } from "../ui/button";


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
import { UpdateTaskSchema } from "@/schemas"
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"

interface DataTableEditProps<TData> {
    row: Row<TData>;
    onEdit: (Value: TData, values: z.infer<typeof UpdateTaskSchema>) => void;

}



interface DataTableStatusProps<TData> {
    row: Row<TData>;
    setStatus: (Value: TData) => void;
}

export const DataTableStatus = <TData,>({
    row,
    setStatus
}:DataTableStatusProps<TData>) => {

    return (
        <Button
        onClick={()=>null}>
            change status
        </Button>
    )
}








interface DataTableDeleteProps<TData> {
    row: Row<TData>;
    onDelete: (Value: TData) => void;
}

export const DataTableDelete = <TDdata,>({
    row, 
    onDelete
}:DataTableDeleteProps<TDdata>) => {
    return(
    <Button
    onClick={()=> onDelete(row.original)}>
    </Button>)
}





interface DataTableEditProps<TData> {
    row: Row<TData>;
    onEdit: (Value: TData, values: z.infer<typeof UpdateTaskSchema>) => void;

}

export const DataTableEdit = <TDdata,>({
    row, 
    onEdit,
}:DataTableEditProps<TDdata>) => {
    const [isEditingTask, setIsEditingTask] = useState(false)

    const enableTaskEditing = () => {
        setIsEditingTask(true)
    }
    const disableTaskEditing = () => {
        setIsEditingTask(false)
        form.reset({ 
            title: row.original.title,
            listId: row.original.listId,
            id: row.original.id
        })
    }

    const form = useForm<z.infer<typeof UpdateTaskSchema>>({
        resolver: zodResolver(UpdateTaskSchema),
        defaultValues: {
            title: row.original.title,
            listId: row.original.listId,
            id: row.original.id
        }
    })

    const onSubmit = (values: z.infer<typeof UpdateTaskSchema>) =>{
        onEdit(values, disableTaskEditing)
    }

    const [isPending, startTransition] = useTransition()
    //const router = useRouter()
    
    
    const formRef = useRef<ElementRef<"form">>(null)
    const onKeyDown = (e: KeyboardEvent) => {
        if(e.key == "Enter"){
            formRef.current?.requestSubmit()
            
        }
    }
    useEventListener("keydown", onKeyDown)
    useOnClickOutside(formRef, disableTaskEditing)


    return (
        <>
        
        {isEditingTask ? 
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
        :
        <button 
        className="h-8 items-center text-lg flex hover:border rounded-md px-3"
        onClick={()=>enableTaskEditing()}>
            {row.original.title}
        </button>
        }
    </>
    )
}