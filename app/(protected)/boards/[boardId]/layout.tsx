import { Header } from "@/components/protected/dropdown/header";
import { auth } from "@/auth";
import { getBoardById } from "@/data/hobbies";

const BoardLayout = async ({
    children,
    params
}:{
    children: React.ReactNode;
    params: {boardId: string};
}) => {
    const board = await getBoardById(params.boardId)

    return (
        <div className="flex flex-col w-full">
            <Header title={board?.name}/>
            <p>{JSON.stringify(board)}</p>
            {children}
        </div>
    )
}

export default BoardLayout