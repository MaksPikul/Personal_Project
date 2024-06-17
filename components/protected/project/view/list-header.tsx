import { ListWithCards } from "@/types"
import { List } from "@prisma/client"

import { useState, useRef, ElementRef } from "react"
import { useEventListener } from "usehooks-ts"
import { FormInput } from "@/components/form/form-input"



interface ListHeaderProps {
    data: List
}

export const ListHeader = ({
    data
}:ListHeaderProps) => {
    const [title, setTitle] = useState(data.title)
    const [isEditing, setIsEditing] = useState(false)

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(()=>{
            inputRef.current?.focus();
            inputRef.current?.select();
        })
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if(e.key == "Escape"){
            formRef.current?.requestSubmit()
        }
    }
    useEventListener("keydown", onKeyDown)

    const handleSubmit = () => {

    }

    const onBlur = () => {
        formRef.current?.requestSubmit();
    }

    return (
        <div>
            {isEditing ? 
                (<form
                ref={formRef}
                action={handleSubmit}>
                    <input hidden id="id" name="id" value={data.id} />
                    <input hidden id="projectId" name="projectId" value={data.projectId}/>
                    <FormInput 
                        ref={inputRef}
                        onBlur={()=> {}}
                        id="title"
                        placeholder="Enter group title"
                        defaultValue={title}
                        className="text-sm px-[7px] py-1 h-7 font-medium 
                        border-transparent hover:border-input focus:border-input
                        transition truncate bg-transparent focus-bg-white"
                    />
                </form>)
                :
                (<div>
                    {title}
                </div>
            )}
        </div>
    )
}