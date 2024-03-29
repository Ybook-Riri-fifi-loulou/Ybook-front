import React, {useState} from "react";
import {useGlobal} from "../providers/GlobalProvider";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const useProfil = () => {
    const navigate = useNavigate();
    const {userInfo} = useGlobal();

    const updateProfilInfos = async (firstname: string, lastname: string) => {
        await fetch(`http://localhost:3100/user/${userInfo?.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                firstname,
                lastname
            })
        })

        navigate('/profil')
    }

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

    const [avatar, setAvatar] = useState<string | null | undefined>('')
    let url = '';
    let key = '';

    const capture = async (webcamRef: React.RefObject<Webcam>) => {
        const imageSrc = webcamRef.current?.getScreenshot()
        setAvatar(imageSrc)
        let file = dataURLToFile(imageSrc, 'test.jpg')
        if (file !== undefined) {
             fetch('http://localhost:3100/post/presignedurl', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem("token_local")}`
                },
            })
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
            await fetch(`http://localhost:3100/user/${userInfo?.id}/profilePicture`, {
                method: 'PUT',
                body: key,
            }).catch(err => console.log(err))
        }

    }


    const getSignedUrlGet = async (key: string|undefined) => {
        console.log(key)
        await fetch(`http://localhost:3100/post/signedurlget?key=${encodeURIComponent(key??"")}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token_local")}`
            },
        })
        .then(response => response.json())
        .then(res => {
            url = res
        }).catch(err => console.log(err))

        await fetch(url)
        .then(res => {
            setAvatar(res.url)
        }).catch(err => console.log(err))
    }

    return {dataURLToFile, capture, setAvatar, avatar, getSignedUrlGet, userInfo, updateProfilInfos}

}

export default useProfil