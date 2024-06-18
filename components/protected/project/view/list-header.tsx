import { ListWithCards } from "@/types"
import { List } from "@prisma/client"

import { useState, useRef, ElementRef, useTransition } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { FormInput } from "@/components/form/form-input"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormError } from "@/components/form-error"
import { UpdateListSchema } from "@/schemas"
import { useParams } from "next/navigation"
import { UpdateList } from "@/actions/update-list"



interface ListHeaderProps {
    data: List
}

export const ListHeader = ({
    data
}:ListHeaderProps) => {
    const params = useParams()

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
        form.reset();
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if(e.key == "Enter"){
            formRef.current?.requestSubmit()
        }
    }
    useEventListener("keydown", onKeyDown)
    useOnClickOutside(formRef, disableEditing)

    const handleSubmit = () => {

    }
    const onBlur = () => {
        formRef.current?.requestSubmit();
    }

    const form = useForm<z.infer<typeof UpdateListSchema>>({
        resolver: zodResolver(UpdateListSchema),
        defaultValues: {
            title:"",
            projectId: params.boardId
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

    return (
        <div className="w-96">
            {isEditing ? 
            (
                <form>
                    lol
                </form>
            )
                :
                (<div 
                className=""
                onClick={()=>enableEditing()}>
                    {title}
                </div>
            )}
        </div>
    )
}