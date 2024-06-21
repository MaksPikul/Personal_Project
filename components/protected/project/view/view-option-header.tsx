"use client"

import { View } from "@prisma/client"
import { NewListButton } from "./list/new-list";
import { FilterButton } from "./filter-button";
import { SearchButton } from "./search-button";
import { SortButton } from "./sort-button";
import { ListWithCards } from "@/types";

interface ViewOptionHeaderProps {
    view: View;
    projectId: string
    optimisticLists: ListWithCards[]
    addOptimisticLists: (action: ListWithCards) => void
}

export const ViewOptionHeader = ({
    view,
    projectId,
    optimisticLists,
    addOptimisticLists,
}:ViewOptionHeaderProps) => {
    

    return (
        <div className="gap-2 flex flex-row m-4">
            {(view?.type==="TABLE") &&
            <>
                <NewListButton projectId={projectId} optimisticLists={optimisticLists} addOptimisticLists={addOptimisticLists} />
                <FilterButton /> 
                <SortButton /> 
                <SearchButton />
            </>
            }






            {(view?.type==="KANBAN")&&
            <>
                <FilterButton /> 
                <SortButton /> 
                <SearchButton />
            </>
            }

            {(view?.type==="NOTEPAD") &&
            <>
                lol notepad
            </>
            }

            {(view?.type==="ROADMAP") && 
            <>
                lol
            </>
            }
        </div>
    )
}