import { db } from "@/lib/db"

export const getManyListsByProjectId = async (boardId: string) => {
    
    try {
        const lists = await db.list.findMany({
            where: {
                projectId: boardId
            },
            include: {
                tasks: {
                    orderBy: {
                        order: "asc"
                    }
                }
            },
            orderBy: {
                order: "asc"
            }
        })

        return lists
    }
    catch{

    }
}