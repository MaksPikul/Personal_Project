import { Filter, Plus, ArrowUpDown, Search, Group } from 'lucide-react';
import { createList } from "@/actions/create-list";
import { NewListButton } from './new-list';
import { Project } from '@prisma/client';

interface TableOptionsProps {
    projectId: string
}


export const TableOptions = ({
    projectId
}: TableOptionsProps) => {

    const style = " w-20 py-1 mr-2 rounded-md transition  flex gap-1 flex-row items-center justify-center"
    
    


    return ( 
        <div className="gap-2 flex flex-row m-4">  

            <NewListButton projectId={projectId}/>

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