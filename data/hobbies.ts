import { db } from '@/lib/db';

export const getBoardByUserId = async (userId: string | undefined) => {
    try{
        const hobby = await db.board.findMany({
            where: {userId},
        })
        return hobby;
    }
    catch{
        return null;
    }
}

export const getBoardById = async (id: string) => {
    try{
        const hobby = await db.user.findMany({
            where: {id},
        })
        return hobby;
    }
    catch{
        return null;
    }
}