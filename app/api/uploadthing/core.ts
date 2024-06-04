import { createUploadthing, type FileRouter } from "uploadthing/next";



import { auth } from "@/auth";
 
const f = createUploadthing();
 
const handleAuth = async () => {
    const session = await auth()
    console.log("passes")
    if (!session?.user?.id) throw new Error("Unauthorized")
    return {userId: session?.user?.id}
}
 

export const ourFileRouter = {
  projectImage: f({ image: {maxFileSize: "4MB", maxFileCount: 1}})
  .middleware(()=> handleAuth())
  .onUploadComplete(()=>{}),

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;