import React, {useState} from "react";
import Webcam from "react-webcam";
import useProfil from "../hooks/useProfil";
import ProfilTabs from "../components/ProfilTabs";
import {Modal} from "react-bootstrap";
import {MdOutlineAddAPhoto} from 'react-icons/md'

export interface ProfilProps {}

const Profil: React.FC<ProfilProps> = () => {
    const { getSignedUrlGet, capture, avatar, userInfo} = useProfil();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const webcamRef = React.useRef<Webcam>(null);

    const videoConstraints = {
        width: 150,
        height: 150,
        facingMode: 'user',
    }

    // Check here if the logged in user is the user on which the profile page is visited
    // So in the future we will not use userInfo?.x but user.x
    // (user which will be equal to the mail to pass in parameter of the page ex: /profile/name.prenom)

    getSignedUrlGet(userInfo?.avatarS3Key)

    return (
        <div className="profil-page">
            <div className="profil-page-header">
                <div className="profil-page-header__cover">
                    <img src="https://res.cloudinary.com/drxtvqede/image/upload/v1675289869/jr-korpa-YXQew2KZjzY-unsplash_1_fp30dm.jpg" className="img-fluid profil-page-header__cover" alt="profil-cover" loading="lazy" />
                </div>
                <div className="container">
                    <div className="profil-page-header__content">
                        <div className="profil-page-header__avatar">
                                <img src={avatar} className="rounded-circle" />
                                <a href="#" className="profil-page-header__update-photo" onClick={handleShow}><MdOutlineAddAPhoto /></a>
                        </div>
                        <div className="profil-page-header__infos">
                            <span className="profil-page-header__name">{userInfo?.firstname}  {userInfo?.lastname}</span>
                            <span className="profil-page-header__register-date">Inscrit depuis le {new Intl.DateTimeFormat('fr', { dateStyle: 'medium' }).format(new Date(userInfo!.createdAt))}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <ProfilTabs />
            </div>
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