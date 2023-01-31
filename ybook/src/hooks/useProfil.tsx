import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
const { S3Client } = require("@aws-sdk/client-s3");


const useProfil = () => {

    const dataURLToFile = (dataurl: string | null | undefined, filename: string) => {
        if (dataurl !== null && dataurl !== undefined) {
            const arr = dataurl.split(',')
            const mime = arr[0].match(/:(.*?);/)![1]
            const bstr = atob(arr[1])
            let n = bstr.length
            const u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            return new File([u8arr], filename, { type: mime })
        }
    }


    return { dataURLToFile }

}

export default useProfil