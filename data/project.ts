import { db } from '@/lib/db';

export const getProjectsByUserId = async (userId: string | undefined) => {
    try{
        const projects = await db.project.findMany({
            where: {
                members: {
                    some: {
                        userId: userId
                    }
                }
            }
        })
        return projects;
    }
    catch{
        return null;
    }
}


export const getProjectById = async (id: string) => {
    try{
        const hobby = await db.project.findUnique({
            where: {id},
        })
        return hobby;
    }
    catch{
        return null;
    }
}

export const getProjectWithMembersWithProfiles = async (projectId : string) =>{
    try{
        const project = await db.project.findUnique({
        where: {
            id: projectId
        },
        include: {
            members: {
                include:{
                    user: true
                }
            }
        }
        })
        return project
    }
    catch{
        return null
    }
}

export const getUserMemberships = async (userId: string | undefined ) => {
    try{
        const memberships = await db.member.findMany({
            where:{
                userId: userId
            },
            include: {
                project: true
            }
        })
        
        return memberships
    }
    catch{
        return null
    }
}