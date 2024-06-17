import { ListWithCards } from "@/types"
import { ListHeader } from "./list-header"

interface ListItemProps {
    index: number
    data: ListWithCards
}

export const ListItem = ({
    index,
    data
}:ListItemProps) => {

    return (
        <li>
            <ListHeader data={data}/>
        </li>
    )
}