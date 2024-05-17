import { Header } from "./header"
import { BackButton } from "./back-button"
import { 
    Card,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import { CardWrapper } from "./card-wrapper"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

export const ErrorCard = () => {
    return (
        <CardWrapper
        headerLabel="Something went wrong"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login">

            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive" />
            </div>
        </CardWrapper>
    )
}