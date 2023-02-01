import React, {useState} from "react";
import {useGlobal} from "../providers/GlobalProvider";
const {S3Client} = require("@aws-sdk/client-s3");


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
            return new File([u8arr], filename, {type: mime})
        }
    }

    const {userInfo} = useGlobal();
    const [picture, setPicture] = useState<any>('')
    let url = '';
    let key = '';

    const capture = async (webcamRef: any) => {
        const imageSrc = webcamRef.current?.getScreenshot()
        setPicture(imageSrc)
        let file = dataURLToFile(imageSrc, 'test.jpg')
        if (file !== undefined) {
            await fetch('http://localhost:3100/post/presignedurl')
                .then(response => response.json())
                .then(res => {
                    url = res.url
                    key = res.key
                })
                .catch(err => console.log(err))
            await fetch(url, {
                method: 'PUT',
                body: file,
            }).then(response => {
                console.log(response)
                console.log(key)
            }).catch(err => console.log(err))
            //body vide je sais pas pourquoi
            await fetch(`http://localhost:3100/user/${userInfo?.id}/profilePicture`, {
                method: 'PUT',
                body: key,
            }).then(response => {
                console.log(response)
            }).catch(err => console.log(err))
        }
    }


    const getSignedUrlGet = async (key: string|undefined) => {
        await fetch(`http://localhost:3100/post/signedurlget/${key}`)
            .then(response => response.json())
            .then(res => {
                url = res
            }).catch(err => console.log(err))
        await fetch(url)
            .then(res => {
                console.log(res)
                setPicture(res.url)
            }).catch(err => console.log(err))
    }

    return {dataURLToFile, capture, setPicture, picture, getSignedUrlGet, userInfo}

}

export default useProfil