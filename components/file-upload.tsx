"use client"

import { DeleteFile } from "@/actions/delete-file";
import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react"
import Image from "next/image";



interface FileUploadProps {
    onChange: (url? : string) => void;
    value: string;
    endpoint: "projectImage"
}


export const FileUpload = ({
    onChange,
    value,
    endpoint
}:FileUploadProps) => {

    const fileType = value?.split(".").pop();
    
    

    
    if (value && fileType !== "pdf"){
        return (
            <div className=" size-28 relative ">
                <Image src={value} 
                fill 
                alt="Upload" 
                className="rounded-full"/>

                <button
                onClick={()=> {
                    DeleteFile(value)
                    onChange("")   
                }}
                className="bg-rose-500 rounded-full absolute right-0">
                    <X className="size-6 "/>
                </button>
            </div>
        )
    }

    
    return(
        <UploadDropzone 
        endpoint={endpoint}
        onClientUploadComplete={(res) =>{
            onChange(res?.[0].url)
        }}
        onUploadError={(error: Error) =>{
            console.log(error)
        }}/>
    )
}