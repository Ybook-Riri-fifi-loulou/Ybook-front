import React, {useState} from "react";
import Webcam from "react-webcam";
import useProfil from "../hooks/useProfil";
import ProfilTabs from "../components/ProfilTabs";
import useModal from "../hooks/useModal";
import {Modal} from "react-bootstrap";

export interface ProfilProps {
}

const Profil: React.FC<ProfilProps> = () => {
    const { getSignedUrlGet, capture, setPicture, picture, userInfo} = useProfil();
    const videoConstraints = {
        width: 150,
        height: 150,
        facingMode: 'user',
    }
    const webcamRef = React.useRef<Webcam>(null)
    getSignedUrlGet(userInfo?.avatarS3Key)


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



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
                                <img src={picture} className="rounded-circle" onClick={handleShow}/>
                            )}
                        </div>
                    </div>
                    {picture != '' ? (
                        <a></a>
                        ) : (
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                capture(webcamRef)
                                handleClose()
                            }}
                            className="btn btn-danger"
                        >
                            Capture
                        </button>
                    )}
                </div>
            </div>
            <h4 className="mb-0">{userInfo?.firstname}  {userInfo?.lastname}</h4>
            <span>{userInfo?.email}</span>
            <ProfilTabs />


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier Votre Profil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Webcam
                        audio={false}
                        height={150}
                        ref={webcamRef}
                        mirrored={true}
                        width={150}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            capture(webcamRef)
                        }}
                        className="btn btn-danger"
                    >
                        Capture
                    </button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}


export default Profil