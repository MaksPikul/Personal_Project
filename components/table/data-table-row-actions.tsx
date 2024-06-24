
import { Row } from "@tanstack/react-table";
import { Button } from "../ui/button";


import { Member, Status, Task, Urgency, User } from "@prisma/client"
import { useEventListener,useOnClickOutside } from "usehooks-ts";
import { useRef, ElementRef, useTransition, useState, RefObject, Dispatch, SetStateAction, } from "react";
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
import { UpdateDescSchema, UpdateTaskSchema } from "@/schemas"
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import * as React from "react"
  import { CalendarIcon } from "@radix-ui/react-icons"
  import { format } from "date-fns"
  import { cn } from "@/lib/utils"
  import { Calendar } from "@/components/ui/calendar"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Notebook, X } from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";


interface AllocateMemberProps<TData> {
    row: Row<TData>
    setMember: ((Value: TData, newMember: Member) => void),
    members: (Member & User)[]
}

export const AllocateMember = <TData, >({
    row,
    setMember,
    members
}:AllocateMemberProps<TData>) => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button>
                {row.original.allocated ?
                    "chosen"
                : 
                    "not chosen"
                }
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
            <DropdownMenuLabel>Change Task Status</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <ScrollArea >
            {members.map((member)=>{
                return (
                    <DropdownMenuItem
                    onClick={()=>setMember(row.original, member )}>
                        <Avatar className="h-8 w-8 ">
                            <AvatarImage src={member.image}/>
                            <AvatarFallback> X </AvatarFallback>
                        </Avatar>
                    </DropdownMenuItem>  
                )
            })
            }
            </ScrollArea>

            <Button>
                unassign yourself | this person
            </Button>


            </DropdownMenuContent>
        </DropdownMenu>
    )
}








interface NotesProps<TData> {
    row: Row<TData>
    saveNote: ((values: z.infer<typeof UpdateDescSchema>) => void),
}

export const Notes = <TData, >({
    row,
    saveNote,
    
}:NotesProps<TData>) => {
    const [success, setSuccess] = useState<string | undefined>("");
    const [error, setError] = useState<string | undefined>("");
    

    const form = useForm<z.infer<typeof UpdateDescSchema>>({
        resolver: zodResolver(UpdateDescSchema),
        defaultValues: {
            desc: row.original.description ,
            listId: row.original.listId,
            id: row.original.id
        }
    })

    const onSubmit = (values: z.infer<typeof UpdateDescSchema>) =>{
        setSuccess("")
        setError("")
        if (values.desc !== row.original.description){
            saveNote(values, setSuccess, setError)
            return
        }
        setError("Note similar to previous")
    }



    return (
    <Sheet onOpenChange={()=>{
        setError("")
        setSuccess("")
    }}>
        <SheetTrigger asChild>
            <Button variant="ghost" className="h-8 ">
                <Notebook className="size-5"/>
            </Button>
        </SheetTrigger>

        <SheetContent >
            <SheetHeader>
            <SheetTitle>{row.original.title}</SheetTitle>
            <SheetDescription >
                {row.original.status}
            </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">

                <Form {...form} >
                    <form
                    onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField 
                            control={form.control}
                            name="desc"
                            render={({ field }) => (
                                <FormItem
                                className="flex flex-col">
                                    {/*<FormLabel>Enter group title</FormLabel>*/}
                                    <FormControl>
                                        <div>
                                            <Label 
                                            htmlFor="desc">
                                                Task Note</Label>
                                            <Textarea 
                                            {...field}
                                            id="desc"
                                            onClick={()=>{
                                                setError("")
                                                setSuccess("")
                                            }}
                                            className="h-96"
                                            />
                                        </div>
                                    </FormControl>
                                    {/*<FormMessage className="relative h-8"/>*/}
                                </FormItem>
                            )}/>
                    <SheetFooter>
                        <Button type="submit"> Save Note </Button>
                        <SheetClose asChild>
                            <Button>Close</Button>
                        </SheetClose>
                    </SheetFooter>
                        <FormSuccess message={success} />
                        <FormError message={error} />
                    </form>
                </Form>
            </div>
        </SheetContent>
    </Sheet>
    )
}



interface DataTableStatusProps<TData> {
    row: Row<TData>;
    action: ((Value: TData, option: Status|Urgency) => void) | ((Value: TData, newUrgency: Urgency)=>void);
    options: string[]
    currentVal: string
}

export const DataTableDropdown = <TData,>({
    row,
    action,
    options,
    currentVal
}:DataTableStatusProps<TData>) => {

    const [val, setCurrentVal] = useState(currentVal)

    const colourMap = {
        ["NEW"]: "lol",

        ["DONE"]: "bg-green-600 hover:bg-green-700 ",
        ["LOW"]: "bg-green-600 hover:bg-green-700 ",

        ["INPROGRESS"]: "bg-yellow-600 hover:bg-yellow-700",
        ["MEDIUM"]: "bg-yellow-600 hover:bg-yellow-700",

        ["HIGH"]: "bg-red-600 hover:bg-red-700 hover",
        ["ERROR"]: "bg-red-600 hover:bg-red-700 hover"
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                
                    <div className={` ${colourMap[val]} transition-all p-2 rounded-md`}>{val}</div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
            <DropdownMenuLabel>Change Task Status</DropdownMenuLabel>
            <DropdownMenuSeparator />


            {options.map((option)=>{
                return (
                    <DropdownMenuItem
                    onClick={()=>action(row.original, option, setCurrentVal)}>
                        {option.toLowerCase()}
                    </DropdownMenuItem>  
                )
            })
            }


            </DropdownMenuContent>
</DropdownMenu>
    )
}



interface DataTableSetDateProps<TData> {
    row: Row<TData>;
    action: (value: TData, newDate: Date) => void;
}

export const DataTableSetDate = <TData, >({
    row,
    action,
}:DataTableSetDateProps<TData>) => {

    const [date, setDate] = useState(row.original.due)

    
 
    return (
    <Popover>
        <PopoverTrigger asChild>
            <Button
            variant={"ghost"}
            className={cn(
                "w-[200px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
            )}
            >
            {/*<CalendarIcon className="mr-2 h-4 w-4" />*/}
            {format(date, "PPP") }
            </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
            <Calendar
            mode="single"
            selected={date}
            
            onSelect={(newDate)=>{
                console.log(date, newDate)
                if (newDate === row.original.due){return}
                setDate(newDate)
                action(row.original, newDate)
            }}
            initialFocus
            />
        </PopoverContent>
    </Popover>
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
    variant="ghost"
    
    onClick={()=> onDelete(row.original)}>
        <X className="size-5"/>
    </Button>)
}



interface DataTableEditProps<TData> {
    row: Row<TData>;
    onEdit: (Value: TData, values: z.infer<typeof UpdateTaskSchema>) => void;

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
    const [title, setTitle] = useState(row.original.title)

    const enableTaskEditing = () => {
        setIsEditingTask(true)
    }
    const disableTaskEditing = () => {
        setIsEditingTask(false)
        form.reset({ 
            title: title,
            listId: row.original.listId,
            id: row.original.id
        })
    }

    const form = useForm<z.infer<typeof UpdateTaskSchema>>({
        resolver: zodResolver(UpdateTaskSchema),
        defaultValues: {
            title: title,
            listId: row.original.listId,
            id: row.original.id
        }
    })

    const onSubmit = (values: z.infer<typeof UpdateTaskSchema>) =>{
        setTitle(values.title)
        inputRef.current.blur()
        onEdit(values, disableTaskEditing)
        
    }

    const [isPending, startTransition] = useTransition()
    //const router = useRouter()
    
    
    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)
    const onKeyDown = (e: KeyboardEvent) => {
        if(e.key == "Enter"){
            formRef.current?.requestSubmit()
            
        }
    }
    useEventListener("keydown", onKeyDown)
    useOnClickOutside(formRef, disableTaskEditing)


    return (
        <>
        
        {/*isEditingTask ? */}
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
                                onClick={enableTaskEditing}
                                className={`${isEditingTask && "bg-red-600"} text-sm w-64 text-red-50 border-transparent  border-white h-8`}
                                ref={inputRef}
                                />
                            </FormControl>
                            {/*<FormMessage className="relative h-8"/>*/}
                        </FormItem>
                    )}/>
                {/*<FormError message={error}/>*/}
            </form>
        </Form>
        {/*}:
        <button 
        className="h-8 items-center text-lg flex hover:border rounded-md px-3 "
        onClick={()=>enableTaskEditing()}>
            
                {row.original.title}
            
        </button>
        }*/}
    </>
    )
}