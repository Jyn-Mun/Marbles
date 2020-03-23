import React, { useState, useEffect } from "react";
import { Card, CardImg, CardGroup } from "reactstrap";
import axios from "axios";
import LoadingIndicator from '../components/LoadingIndicator';
import Image from "react-graceful-image";
import "./UserImages.css"
import { Modal, Button } from "react-bootstrap"
import Comments from "./comments"

function UserImages({ threadId, userID }) {
  const [userImages, setUserImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    axios
      .get("https://marbles-backend.herokuapp.com/api/v1/threads/")
      .then(result => {
        console.log(result);
        setUserImages(result.data.template);
        setIsLoading(false);
      });
  }, [threadId]);

  if (isLoading) {
    return (
      <LoadingIndicator size="150px" />
    )
  }

  else {
    return (
      <>
        <div onClick={handleShowModal}>
          <Image height="100%" width="100%" src={`https://marblesbackend.s3-ap-southeast-1.amazonaws.com/${userImages}`} className="UserImages" />
        </div>
        <Modal show={showModal}>
          <Modal.Header>
            <Button onClick={handleCloseModal}>
              Return To Home
          </Button>
          </Modal.Header>
          <Modal.Body>
            <Modal.Title>
              <Image src={`https://marblesbackend.s3-ap-southeast-1.amazonaws.com/${userImages}`} className="EnlargedImage"></Image>
            </Modal.Title>

          </Modal.Body>
          <Modal.Footer>

            <div>
<<<<<<< HEAD
              
              <Comments userImages={userImages} threadId={threadId} userID={userID}/>
=======

              <Comments threadId={threadId} userID={userID} />
>>>>>>> 6a7162c8a7a970a39f1664243c1ee273852c614d
            </div>

          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default UserImages;