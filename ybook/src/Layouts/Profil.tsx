import React, {useState} from "react";
import Webcam from "react-webcam";
import useProfil from "../hooks/useProfil";
import useModal from "../hooks/useModal";
import ListPosts from "../components/ListPosts";
import {PostProvider} from "../providers/PostProvider";
import ProfilTabs from "../components/ProfilTabs";

export interface ProfilProps {
}

const Profil: React.FC<ProfilProps> = () => {
    const [profil, setProfil] = useState<Object | undefined>();
    const {dataURLToFile} = useProfil();
    const {isOpen, toggle} = useModal();


    const videoConstraints = {
        width: 150,
        height: 150,
        facingMode: 'user',
    }
    const [picture, setPicture] = useState<any>('')
    const webcamRef = React.useRef<Webcam>(null)
    let url = '';
    let key = 'image/rifilou';

    const capture = React.useCallback(
        async () => {
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
                await fetch('http://localhost:3100/user/28/profilePicture', {
                    method: 'PUT',
                    body: key,
                }).then(response => {
                    console.log(response)
                }).catch(err => console.log(err))
            }
        },
        [webcamRef]
    )

    return (
        <div className="mt-5 text-center">
            <div className="upper">
                <div className="user text-center">
                    <div className="profile">
                        <div>
                            {picture == '' ? (
                                <Webcam
                                    audio={false}
                                    height={150}
                                    ref={webcamRef}
                                    mirrored={true}
                                    width={150}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                />
                            ) : (
                                <img src={picture}/>
                            )}
                        </div>
                    </div>
                    {picture != '' ? (
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setPicture(webcamRef.current?.getScreenshot())
                            }}
                            className="btn btn-primary"
                        >
                            Retake
                        </button>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                capture()
                            }}
                            className="btn btn-danger"
                        >
                            Capture
                        </button>
                    )}
                </div>
            </div>
            <h4 className="mb-0">TEST JEAN</h4>
            <ProfilTabs />

        </div>
    )
}


export default Profil