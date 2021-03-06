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
        let tempt = result.data.template;
        let temp = tempt.sort((a, b) => { return b.id - a.id })
        setUserImages(temp);
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
          <Image height="100%" width="100%" src={`https://marblesbackend.s3-ap-southeast-1.amazonaws.com/${userImages}`} className="userImages" />
        </div>
        <Modal show={showModal}>
          <Modal.Header>
            <Button onClick={handleCloseModal}>
              Return To Home
          </Button>
          </Modal.Header>
          <Modal.Body>
            <Modal.Title>
              <Image src={`https://marblesbackend.s3-ap-southeast-1.amazonaws.com/${userImages}`} className="enlargedImage"></Image>
            </Modal.Title>

          </Modal.Body>
          <Modal.Footer>

            <div>

              <Comments userImages={userImages} threadId={threadId} userID={userID} />
            </div>

          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default UserImages;