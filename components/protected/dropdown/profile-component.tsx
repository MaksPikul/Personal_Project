"use client"

import { Avatar , AvatarFallback , AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { DropDown } from "./dropdown"


export const Profile = () => {
    const [showDropDown, setDropDown] = useState(false)

    const openDropDown = () => {
        setDropDown(!showDropDown)
    }
    
    return (
        <div>
            <div className="px-10 py-3 flex">
                <button onClick={()=>{openDropDown()}}>
                        <Avatar>
                            <AvatarImage src=""/>
                            <AvatarFallback> P </AvatarFallback>
                        </Avatar>
                </button>
            </div>
                
                {showDropDown ? 
                <DropDown />
                :
                <div className="w-64 top-2 m-2 "></div>
                }
                
        </div>
    )
}