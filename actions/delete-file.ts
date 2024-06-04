"use server"

import { UTApi } from "uploadthing/server";

export const DeleteFile = async (value:string) => {
    const utapi = new UTApi()
    const id = value.split("/")[4]
    console.log(id)
    utapi.deleteFiles(id)
}