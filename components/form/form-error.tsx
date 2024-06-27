import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface FormErrorProps {
    id: string;
    errors?: Record<string, string[] | undefined>;
};

export const FormError = ({
    id,
    errors
}: FormErrorProps) => {
    if (!errors) {return null}

    return(
        <div 
        id={`${id}-error`}
        aria-live="polite"
        className="bg-destructive/15 p-3 rounded-md 
        flex items-center gap-x-2 text-sm text-destructive">

            <>
                <ExclamationTriangleIcon 
                className="h-4 w-4" />
                {errors?.[id]?.map((error: string)=>(
                    <div
                    className="" 
                    key={error}>
                        {error}
                    </div>
                ))}
            </> 

        </div>
    )
}