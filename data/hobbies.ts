import { db } from '@/lib/db';

export const getBoardsByUserId = async (userId: string | undefined) => {
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
        const hobby = await db.board.findUnique({
            where: {id},
        })
        return hobby;
    }
    catch{
        return null;
    }
}