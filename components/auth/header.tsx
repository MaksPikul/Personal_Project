

interface HeaderProps {
    label: string;
};

export const Header = ({
    label,
}: HeaderProps) => {
    return(
        <div className="w-full flex flex-col gap-y-4 items-center">
           <h1 className="text3xl font-semibold">
            Auth
            </h1>
            <p>
            {label}
            </p> 
        </div>
    )
}