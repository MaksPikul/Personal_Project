import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface ProfileActionProps {
    label: string;
}

export const ProfileActions = ({
    label,
}:ProfileActionProps) => {

    const style = "hover:bg-slate-300 w-full pr-32 justify-start"

    return (
        <div>
            <DropdownMenuItem className={style}>
                <button>Settings</button>
            </DropdownMenuItem>

            <DropdownMenuItem className={style}>
                <button> Account </button>
            </DropdownMenuItem>

            <DropdownMenuItem className={style}>
                <button>Sign out</button>
            </DropdownMenuItem>
        </div>
    )
}