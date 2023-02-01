import React, {useState} from "react";
import Webcam from "react-webcam";
import useProfil from "../hooks/useProfil";
import ProfilTabs from "../components/ProfilTabs";
import {Modal} from "react-bootstrap";

export interface ProfilProps {}

const Profil: React.FC<ProfilProps> = () => {
    const { getSignedUrlGet, capture, avatar, userInfo} = useProfil();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const webcamRef = React.useRef<Webcam>(null)

    const videoConstraints = {
        width: 150,
        height: 150,
        facingMode: 'user',
    }
    getSignedUrlGet(userInfo?.avatarS3Key)

    return (
        <div className="profil-page">
            <div className="container">
                <div className="profil-page-header">
                    <div className="profil-page-header__avatar">
                        {avatar == '' ? (
                            <Webcam audio={false} height={150} ref={webcamRef} mirrored={true} width={150} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} />
                        ) : (
                            <img src={avatar} className="rounded-circle" onClick={handleShow}/>
                        )}
                        {avatar != '' ? (
                            <a></a>
                            ) : (
                            <button onClick={(e) => { e.preventDefault(); capture(webcamRef); handleClose() }} className="btn btn-danger">Capture</button>
                        )}
                    </div>
                    <div className="profil-page-header__infos">
                        <span className="profil-page-header__name">{userInfo?.firstname}  {userInfo?.lastname}</span>
                        <span className="profil-page-header__email">{userInfo?.email}</span>
                    </div>
                </div>
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
        </div>
    )
}


export default Profil