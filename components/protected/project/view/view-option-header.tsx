"use client"

import { View } from "@prisma/client"
import { NewListButton } from "./list/new-list";
import { FilterButton } from "./filter-button";
import { SearchButton } from "./search-button";
import { SortButton } from "./sort-button";
import { ListWithCards, ProjectWithMembersWithProfiles } from "@/types";

interface ViewOptionHeaderProps {
    project: ProjectWithMembersWithProfiles
}

export const ViewOptionHeader = ({
    project,
    
}:ViewOptionHeaderProps) => {
    

    return (
        <div className="gap-2 flex flex-row m-4">
            <>
                <NewListButton 
                projectId={project.id} 
                />
                {/*<Members /> */}
                Project Activity |
                Members 
            </>
        </div>
    )
}