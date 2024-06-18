import { Filter, Plus, ArrowUpDown, Search, Group } from 'lucide-react';

export const SortButton = () => {
    return (
        <button 
        className={"transition hover:text-primary hover:bg-indigo-100 w-20 py-1 mr-2 rounded-md flex gap-1 flex-row items-center justify-center"}>
            Sort <ArrowUpDown size={18}/>
        </button>
    )
}