"use client"

import { ListWithCards, ProjectWithMembersWithProfiles } from "@/types";
import { ViewOptionHeader } from "@/components/protected/project/view/view-option-header";
import { useState, useEffect, useOptimistic, useTransition, useCallback, createContext } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UpdateListOrder } from "@/actions/lists/update-list-order";
import { ListItem } from "./list/list-item";
import { UpdateTaskOrder } from "@/actions/lists/update-task-order";
import { MemberRole } from "@prisma/client";

function reorder<T>(lists: T[], startIndex:number, endIndex:number){
    const result = Array.from(lists);
    const [removed] =  result.splice(startIndex,1)
    result.splice(endIndex, 0, removed);
    return result;
}

interface ProjectProps {
    lists : ListWithCards[]
    project: ProjectWithMembersWithProfiles,
    role: MemberRole
}
export const projectContext = createContext(undefined)
export const ProjectPage = ({
    lists,
    project,
    role
}:ProjectProps) => {
    const [orderedLists, setOrderedLists] = useState(lists)
    const [isPending, startTransition] = useTransition()

    const isAdmin = role === MemberRole.ADMIN;
    const isMod = isAdmin || role === MemberRole.MOD;
    const [projectInfo, setProjectInfo] = useState({roles:{isAdmin: isAdmin, isMod: isMod}})
    
    




    useEffect(()=>{
        setOrderedLists(lists)
    },[lists])

    const setListOrder = useCallback((
        items: any,
        projectId: string,
    )=>{
        startTransition(()=>{
            UpdateListOrder(items, projectId)
            .then( (data) =>{
                if (data?.error){
                    //setError(data?.error)
                }
                else {
                    //setSuccess(data?.message)
                    //router.refresh()
                }
            })
        })
    }, [])

    const setTaskrder = useCallback((
        items: any,
        listId: string,
    )=>{
        startTransition(()=>{
            UpdateTaskOrder(items, listId)
            .then( (data) =>{ 
                if (data?.error){
                    //setError(data?.error)
                }
                else {
                    //setSuccess(data?.message)
                    //router.refresh()
                }
            })
        })
    }, [])

    const onDragEnd = (result: any) => {
        const { destination, source, type} = result
        if(!destination){
            return;
        }
        if(
            destination.droppableId === source.droppablId &&
            destination.index === source.index
        ){
            return;
        }

        if (type === "list") {
            const items = reorder(
                orderedLists, 
                source.index, 
                destination.index
            ).map((item, index)=>({...item, order: index}));

            setOrderedLists(items)
            setListOrder(items, project.id)
        }

        if (type === "task") {

            
            let newOrderedLists = [...orderedLists];
           
            const sourceList = newOrderedLists.find(list => list.id === source.droppableId)
            const destList = newOrderedLists.find(list => list.id === destination.droppableId)

            

            if (!sourceList || !destList) {
                return;
            }

            if (!sourceList.tasks) {
                sourceList.tasks = []
            }
            if (!destList.tasks) {
                destList.tasks = []
            }

            //same list
            if (source.droppableId === destination.droppableId){
                
                console.log(orderedLists[0].tasks)
                const reorderedTasks = reorder(
                    sourceList.tasks,
                    source.index,
                    destination.index
                )
                
                reorderedTasks.forEach((task,index) => {
                    task.order = index
                })
                

                sourceList.tasks = reorderedTasks
                
                console.log(newOrderedLists[0].tasks)
                setOrderedLists(newOrderedLists)
                
                
                //Server action
            }
            else {
                console.log("nyan2")
                const [movedTask] = sourceList.tasks.splice(source.index, 1)
                movedTask.listId = destination.droppableId

                destList.tasks.splice(destination.index, 0, movedTask)

                sourceList.tasks.forEach((task, index) => {
                    task.order = index
                })

                destList.tasks.forEach((task, index)=>{
                    task.order = index
                })
                console.log(orderedLists)
                console.log(newOrderedLists)
                setOrderedLists(newOrderedLists)
            }
            setTaskrder(newOrderedLists, project.id)
        }
    }

   


    //this component will receive members
    return (
    <projectContext.Provider value={projectInfo}>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable 
            droppableId="lists" 
            type="list" 
            direction="vertical">
                {(provided)=>(
                <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className=" flex flex-col h-full m-1 gap-y-5">
                    {orderedLists.map((list,index)=>{
                        return(
                            <ListItem 
                            key={list.id}
                            index={index}
                            list={list}
                            />
                        )
                    })}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </DragDropContext>
    </projectContext.Provider>
    )
}