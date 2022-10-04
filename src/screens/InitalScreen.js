import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import logo from '../assets/Images/logo.jpeg'
import titleImage from '../assets/Images/HL_Health_Advice.png'
import { useNavigate } from 'react-router-dom';

export default function InitalScreen() {
    const navigate = useNavigate();
useEffect(()=>{
    const timer = setTimeout(() => { navigate('/login');  }, 5000);
    return () => clearTimeout(timer);
},[])
  return (
      <Container className='p-5'>

<Row className="justify-content-md-center">
    <Col xs={12} sm={4} md={4}>
    <img src={logo} style={{ verticalAlign:'center',width:'400px',height:'400px'}} />    </Col>
</Row>
<Row className="justify-content-md-center">
    <Col xs={12} sm={4} md={4}>
    <img src={titleImage} style={{ verticalAlign:'center',width:'200px',height:'200px'}} />    </Col>
</Row>
    </Container>
  )
}
