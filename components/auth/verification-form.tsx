"use client"

import { CardWrapper } from "./card-wrapper"
import { CircleLoader } from "react-spinners"
import { useSearchParams} from "next/navigation"
import { useCallback, useEffect, useState} from "react"
import { Verification } from "@/actions/verification"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"

export const VerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const onSubmit = useCallback(()=>{
        if (!token ) { 
            setError("Missing token")
            return
        }

        Verification(token)
        .then((data) => {
            setSuccess(data.success)
            setError(data.error)
        })
    }, [token])
    

    useEffect(() => {
        onSubmit();
    },[onSubmit])


    return (
        <CardWrapper
        headerLabel="Confirming email verification"
        backButtonHref="/auth/login"
        backButtonLabel="back to login"
        >
            
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <CircleLoader />
                )}
                <FormError message={error}/>
                <FormSuccess message={success}/>
            </div>
        </CardWrapper>
    )
}