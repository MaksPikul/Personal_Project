"use client"

import { NewListButton } from "./list/new-list";
import { FilterButton } from "./filter-button";
import { SearchButton } from "./search-button";
import { SortButton } from "./sort-button";
import { ListWithCards, ProjectWithMembersWithProfiles } from "@/types";
import { useContext } from "react";
import { roleContext } from "../project-header";

interface ViewOptionHeaderProps {
    project: ProjectWithMembersWithProfiles
}

export const ViewOptionHeader = ({
    project
}:ViewOptionHeaderProps) => {
    
    return (
    <div className="gap-2 flex flex-row m-4">
        <NewListButton/>
        {/*<Members /> */}
        Project Activity |
        Members 
    </div>
    )
}