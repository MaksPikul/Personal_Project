"use client"

import { CardWrapper } from "./card-wrapper"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schemas"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "../ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator
} from "@/components/ui/input-otp"

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { LoginButton } from "./login-button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"
import { Login } from "../../actions/login"
import { useTransition, useState } from "react"
import { useSearchParams } from "next/navigation"
import  Link  from "next/link"

 
export const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [show2FA, setShow2FA] = useState(false);
    const [isPending, startTransition] = useTransition();
    
    

    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Email already in use with different provider" 
        : "";

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            pin: undefined
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")

        startTransition(()=>{
            Login(values)
            .then((data) =>{
                if (data?.error){
                    form.reset();
                    setError(data?.error)
                }
                if (data?.success){
                    form.reset();
                    setSuccess(data?.success)
                }
                if (data?.twoFactor){
                    setShow2FA(true)
                }
            })
        })
    }

    return(
        <CardWrapper
            headerLabel="Welcome"
            backButtonHref="/auth/register"
            backButtonLabel="Don't have an account?"
            showSocial
        >
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 ">   

                    <div
                    className="space-y-4 ">

                        
                    {!show2FA ? 
                        <>
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
                        <FormField 
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    disabled={isPending}
                                    placeholder="******"
                                    type="password"
                                    />
                                </FormControl>
                                
                                <Button
                                size="sm"
                                variant="link"
                                asChild
                                className="px-0 font-normal">
                                    <Link
                                    href="/auth/reset">
                                        Forgot password?
                                    </Link>
                                </Button>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        </>
                    : 
                        <div className="self-center">
                        <FormField 
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                            <FormItem className="items-center">
                                <FormLabel>2FA Code</FormLabel>
                                <FormControl >

                                    <Input 
                                    {...field}
                                    disabled={isPending}
                                    placeholder="123456"
                                    />

                        {/*
                                    <InputOTP 
                                    maxLength={6} 
                                    {...field}
                                    disabled={isPending}
                                    
                                    value={value}
                                    onChange={(value) => setValue(value)}
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>
                                            <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                        */}
                                </FormControl>
                                <FormDescription>
                                Please enter the one-time password sent to your phone.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        </div>

                    }
                    </div>

                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full ">
                        {show2FA? "confirm" : "Login"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

