import React from 'react'
import { Modal, Button } from 'react-bootstrap'
function ModalAlert({message,
   
    visible,
    onConfirm
    ,}) {
  
  return (
    <>
      <Modal show={visible}>
        <Modal.Header closeButton onClick={onConfirm}>
          <Modal.Title>Error Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onConfirm}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalAlert