import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function ToastInformation({text, hidden}) {
  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
  
  return (
    <Row className='parent p-2'>
      <Col className="mb-2 child">
        <Toast show={showA} onClose={() => {toggleShowA(); hidden()}}>
          <Toast.Header>
            <strong className="me-auto">Information</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{text}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default ToastInformation;