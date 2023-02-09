import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AppModal = ({ show, setShow, callback, header }) => {
  let navigate = useNavigate()
   const [pseudo, setPseudo] = useState("");
  const handleClose = () => {
    setShow(false);
    navigate(-1)
  } 

  const handleCallback = () => {
    if (pseudo) {
      callback(pseudo)
    }
  }
  return (
    <div className="modal-container">
      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Votre pseudo</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Entrer votre pseudo"
                onChange={(e) => setPseudo(e.target.value)}
              />
              <small id="emailHelp" className="form-text text-muted"></small>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCallback}>
            Commencer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AppModal;