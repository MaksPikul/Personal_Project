"use client"

import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ResetSchema } from "@/schemas"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { LoginButton } from "./login-button"
import { FormError } from "../form/form-error"
import { FormSuccess } from "../form-success"
import { Reset } from "../../actions/reset-password"
import { useTransition, useState } from "react"



 
export const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
            
        }
    })

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("")
        setSuccess("")

        startTransition(()=>{
            Reset(values)
            .then((data) =>{
                setError(data?.error)
                setSuccess(data?.success)
            })
        })
    }

    return(
        <CardWrapper
            headerLabel="Change password"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login">
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">   

                    <div
                    className="space-y-4">
                        <FormField 
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    disabled={isPending}
                                    placeholder="example@example.com"
                                    type="email"
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>


            

                    </div>
                    <FormError message={error } />
                    <FormSuccess message={success} />
                    <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full">
                        Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

