
interface OptionProps {
    label: string;
}

export const ProfileOptions = ({
    label,
}:OptionProps) => {

    return (
        <div >
            <button type="button" className="bg-red-500 w-full ps-3 text-left py-2 hover:bg-slate-50">
                {label}
            </button>
        </div>
    )
}