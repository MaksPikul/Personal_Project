"use client"

import { Settings } from "@/actions/settings"
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { useTransition, useState } from "react";

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SettingsSchema } from "@/schemas";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";



export const SettingsForm = () =>  {
    const [isPending, startTransition] = useTransition()
    const {update, data: session} = useSession()
    const router = useRouter()
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>()
    
    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(()=>{
            Settings(values)
            .then((data)=>{
                if (data.error){
                    setError(data.error)
                    form.reset();
                }
                if (data.success) {
                    update()
                    form.reset();
                    setSuccess(data.success)
                    router.refresh()
                }
            })
        })
    }
    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: undefined,
            email: undefined,
            password: undefined,
            newPassword: undefined,
        }
    })
    
    //<header> Change Account Details</header>
    //<header> Change Password and Authentication</header>

    return (
       
            <div className="flex p-2  bg-blue-500 ">
            
            <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">

                <FormField 
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input 
                            {...field}
                            disabled={isPending}
                            placeholder={session?.user?.name}
                            className="w-72 "
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>

                {session?.user?.isOAuth === false &&
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
                            placeholder={session?.user?.email}
                            className="w-72"
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <FormField 
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                            <Input 
                            {...field}
                            disabled={isPending}
                            className="w-72"
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
                        <FormLabel>Old Password</FormLabel>
                        <FormControl>
                            <Input 
                            {...field}
                            disabled={isPending}
                            className="w-72"
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
            
                <FormField 
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                    <FormItem>
                        <div>
                            <FormLabel>Two Factor Authorization</FormLabel>
                            <FormDescription> Enable 2FA for your account</FormDescription>
                        </div>
                        <FormControl>
                        <Switch 
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                        </FormControl>
                    </FormItem>
                )}/>
                </>}

                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full">
                        Save Changes
                    </Button>


                </form>
            </Form>
        </div >
       
    )
}