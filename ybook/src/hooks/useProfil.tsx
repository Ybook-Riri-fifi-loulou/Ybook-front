import React, {useState} from "react";
import {useGlobal} from "../providers/GlobalProvider";

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
    const [avatar, setAvatar] = useState<any>('')
    let url = '';
    let key = '';

    const capture = async (webcamRef: any) => {
        const imageSrc = webcamRef.current?.getScreenshot()
        setAvatar(imageSrc)
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
            }).catch(err => console.log(err))
            //body vide je sais pas pourquoi
            await fetch(`http://localhost:3100/user/${userInfo?.id}/profilePicture`, {
                method: 'PUT',
                body: key,
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
                setAvatar(res.url)
            }).catch(err => console.log(err))
    }

    return {dataURLToFile, capture, setAvatar, avatar, getSignedUrlGet, userInfo}

}

export default useProfil