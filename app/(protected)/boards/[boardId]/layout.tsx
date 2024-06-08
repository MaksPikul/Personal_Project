import { ProjectHeader } from "@/components/protected/project/project-header";
import { getBoardById } from "@/data/hobbies";
import { Separator } from "@/components/ui/separator";


const BoardLayout = async ({
    children,
    params
}:{
    children: React.ReactNode;
    params: {boardId: string};
}) => {
    const board = await getBoardById(params.boardId)

    return (
        <div className="flex flex-col  bg-card rounded-md my-1 mr-1 w-screen">
            {/* make it a different header component */}
            <ProjectHeader title={board?.name}/>
            <Separator className="bg-card-foreground"/> 
            {children}
        </div>
    )
}

export default BoardLayout