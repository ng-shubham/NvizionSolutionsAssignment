import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DeleteModal(props) {
    const { show, handleClose, deleteUserHandler } = props
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete record</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure that you want to permanently delete the selected record?</Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={deleteUserHandler}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DeleteModal