import { Separator } from "@/components/ui/separator";
import { Filter, Plus, ArrowUpDown, Search, Group } from 'lucide-react';

export const TableKanbanOptions= () => {

    const style = " w-20 py-1 mr-2 rounded-md transition  flex gap-1 flex-row items-center justify-center"

    return ( 
        <div className="gap-2 flex flex-row m-4">  
            <button className={`bg-green-500 transition hover:bg-green-700 ${style} `}>
                <Plus size={18}/> Class
            </button>

            <button 
            className={`transition hover:text-primary hover:bg-indigo-100  ${style} `}>
                Filter <Filter size={18}/>
            </button>

            <button 
            className={`transition hover:text-primary hover:bg-indigo-100 ${style} `}>
                Sort <ArrowUpDown size={18}/>
            </button>

            <button 
            className={`transition hover:text-primary hover:bg-indigo-100  ${style} `}>
                Search <Search size={18}/>
            </button>

            <button 
            className={`transition hover:text-primary hover:bg-indigo-100  ${style} `}>
                Group <Group size={18}/>
            </button>
        </div>
    )
}