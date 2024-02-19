/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Home from '../Pages/Home'

function Model({ onDelete, onHide, ...props }) {
    const [deleteState, setDeleteState] = useState(false)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Alert
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You are trying to delete the Book Id: {props.data}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={setDeleteState(true)}>Delete the book</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Model;





// /* eslint-disable no-unused-vars */
// import React from "react";
// import Button from "react-bootstrap/Button";
// import Modal from 'react-bootstrap/Modal';


// function Model(props,{onDelete, onHide, }) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Alert
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p>
//           You are trying to delete the Book Id: {props.data}
//         </p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={onHide}>Close</Button>
//         <Button onClick={onDelete}>Delete the book</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default Model;
