import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import Webcam from "react-webcam";
import useProfil from "../hooks/useProfil";

export interface ProfilModalProps {}

const ProfilModal: React.FC<ProfilModalProps> = ( state) => {

    const [show, setShow] = useState(false);
    const {capture} = useProfil();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const videoConstraints = {
        width: 150,
        height: 150,
        facingMode: 'user',
    }
    const webcamRef = React.useRef<Webcam>(null)


    return (
        <>
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
        </>
    );
}

export default ProfilModal;