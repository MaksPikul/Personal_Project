import { Header } from "@/components/protected/header";
import { auth } from "@/auth";
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
        <div className="flex flex-col bg-card rounded-md my-1 mr-1 w-screen">
            <Header title={board?.name}/>
            <Separator />
            <p>{JSON.stringify(board)}</p>
            {children}
        </div>
    )
}

export default BoardLayout