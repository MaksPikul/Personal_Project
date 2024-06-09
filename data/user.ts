import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
    try{
        const user = await db.user.findUnique({
            where: {email},
        })
        return user;
    }
    catch{
        return null;
    }
}

export const getUserByID = async (id: string | undefined) => {
    try{
        const user = await db.user.findFirst({
            where: {id},
        })
        return user;
    }
    catch{
        return null;
    }
}

export const getUserWithProjectsWithMembers = async (userId : string | undefined) => {
    try{
        const user = await db.user.findUnique({
            where: {
                id: userId
            },
            include:{
                projects:{
                    include:{
                        members:{
                            include:{
                                user: true
                            }
                        }
                    }
                }
            }
        })

        return user
    }
    catch{
        return null
    }
}