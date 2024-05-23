import { db } from '@/lib/db';

export const getHobbiesByUserId = async (owner: string) => {
    try{
        const hobby = await db.hobby.findMany({
            where: {owner},
        })
        return hobby;
    }
    catch{
        return null;
    }
}

export const getHobbiesById = async (id: string) => {
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