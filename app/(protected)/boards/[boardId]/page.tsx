import { auth } from "@/auth";

import { redirect} from "next/navigation";
import { getInitialView } from "@/data/view";

const BoardPage = async (
    {params}: {params: {boardId: string}}
) => {
    const session = await auth()
    const project = await getInitialView(params.boardId, session?.user?.id)
    const initialView = project?.views[0]

    return redirect(`/boards/${params.boardId}/views/${initialView?.id}`)
}
export default BoardPage
