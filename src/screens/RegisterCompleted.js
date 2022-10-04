import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import backgroundImage from '../assets/Images/Background.jpg'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import next from '../assets/Images/next.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalAlert from '../component/ModalAlert';
import { setData } from '../toolkit/reducer/GetData';
import { useDispatch,useSelector } from 'react-redux';

export default function RegisterCompleted() {
  
    const {state} = useLocation();
    const navigate = useNavigate();
    const { result} = state;
    console.log("RESLT%%%",result)
   const oNNextScreen = ()=>{
    navigate('/login')
   }
  return (

<Container>
<div>
<div className="banner-image-about">
<div>
       <span className="tagline">Registration Completed</span>
       
       <div className="tagline-para">
       on the next Screen we will start your login
       
       </div >
      
       </div>
       <Row className="justify-content-md-center">
      <Col xs lg="2">
        </Col>
        <Col xs lg="3">
        <div class="sub-main">
       <button onClick={oNNextScreen} class="button-three">Login</button>

    </div>   
        </Col>
        <Col xs lg="2">
       </Col>
      </Row>
   
      
     </div>
   </div>
  
   </Container>
   )
}
