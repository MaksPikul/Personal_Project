"use client"

import { View } from "@prisma/client"
import { NewListButton } from "./new-list";
import { FilterButton } from "./filter-button";
import { SearchButton } from "./search-button";
import { SortButton } from "./sort-button";

interface ViewOptionHeaderProps {
    view: View;
    projectId: string
}

export const ViewOptionHeader = ({
    view,
    projectId
}:ViewOptionHeaderProps) => {
    

    


    return (
        <div className="gap-2 flex flex-row m-4">
            {(view?.type==="TABLE") &&
            <>
                <NewListButton projectId={projectId}/>
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