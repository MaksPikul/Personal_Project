"use server"

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import {
    DEFAULT_LOGIN_REDIRECT,
    authRoutes
} from "@/routes"

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    };
};

const InviteCodePage = async ({
    params
}:InviteCodePageProps) => {

    const session = await auth()
    const user = session?.user

    if (!user) {
        return redirect(authRoutes[0])
    }
    if (!params.inviteCode) {
        return redirect(DEFAULT_LOGIN_REDIRECT)
    }

    const alreadyMember = await db.project.findFirst({
        where:{
            inviteCode: params.inviteCode,
            members: {
                some: {
                    userId: user.id
                }
            }
        }
    });

    if (alreadyMember) {
        return redirect(`/boards/${alreadyMember.id}`)
    }

    const project = await db.project.update({
        where: {
            inviteCode: params.inviteCode
        },
        data: {
            members: {
                create: [
                    {userId: user.id}
                ]
            }
        }
    })

    if (project) {
        return redirect(`/boards/${project?.id}`)
    }

    return null;
    
}

export default InviteCodePage