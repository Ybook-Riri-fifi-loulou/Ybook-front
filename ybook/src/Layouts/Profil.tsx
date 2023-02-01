import React, {useState} from "react";
import Webcam from "react-webcam";
import useProfil from "../hooks/useProfil";
import ProfilTabs from "../components/ProfilTabs";

export interface ProfilProps {
}

const Profil: React.FC<ProfilProps> = () => {
    const {capture, setPicture, picture} = useProfil();

    const videoConstraints = {
        width: 150,
        height: 150,
        facingMode: 'user',
    }
    const webcamRef = React.useRef<Webcam>(null)

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
                                capture(webcamRef)
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