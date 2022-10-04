import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import backgroundImage from '../assets/Images/Background.jpg'
import { useNavigate } from 'react-router-dom';
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import start from '../assets/Images/start.png'
import nz from '../assets/Images/nz.png'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalAlert from '../component/ModalAlert';
import Spinner from 'react-bootstrap/Spinner';

export default function LoginScreen() {
    const [loader,setLoader ] =useState(false)

    const [phonenumber,setPhoneNumber] = useState()
    const [isVerifying, setIsVerifying] = useState(false);
    const [enterNumber, setEnterNumber] = useState('');
    const [alertMessage,setAlertMessage] =useState(null)
    const [modalVisible,setModalVisible] =useState(false)
    const closeModal = ()=>{
        setModalVisible(false)
    }
    const [number,setNumber] = useState();
    
    const navigate = useNavigate();


    useEffect(()=>{
        setNumber("+"+phonenumber)
        console.log
    ("Number",number)
    },[phonenumber])

    const oNNextScreen = ()=>{
            if (number) {
              setLoader(true)
                setIsVerifying(true)
                var myHeaders = new Headers();
    
                myHeaders.append("Content-Type", "application/json");
    
                var raw = JSON.stringify({
                  
                    "phone": number,
                    "ipaddress": "192.168.1.1"
                });
    
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
    
                console.log("raw",raw)
    
                fetch('https://us-central1-bcms-covid-check.cloudfunctions.net/covidappdev/dev/healthline/v1/sendotp', requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result.status == 1) {
                            setIsVerifying(false)
                            if (result) {
                                console.log({ result })
                                navigate ('/verLogin',{state:{  accessToken: result.accessToken,
                                    number: number,
                                    screename: 'login',
                                    phone:number}})
                                   
                            } 
                        }
                        else if (result.status == 0) {
                            console.log("RESULT COND ELSE IF Result",result.message)
                            setIsVerifying(false)
                            setAlertMessage(result.message)
                            setModalVisible(true)
                            setLoader(false)
                            
                            
                        }
                        else {
                          setLoader(false)
                            setIsVerifying(false)
                           
                            console.log("ELSE COND Result",result.message)
                            setAlertMessage(result.message)
                            setModalVisible(true)
    
                        }
                    })
                    .catch(error =>  {setIsVerifying(false) 
                        
                        console.log('error from this', error) })
            }
            else {
              setLoader(false)
              setAlertMessage("Sorry the phone number you have entered isn't in the correct format. Please try again.")
              setModalVisible(true)
            }
        
        }
  return (
    <Container>
 <div>
 <div className="banner-image-about">
 <div>
        <span className="tagline">Login</span>
        
        <div className="tagline-para">
        Healthline provides you with free health advice 24/7.
        
        </div >
        <div className="tagline-para">
     Don't have an account?<b><a href='/register' style={{color:'#000',textDecoration:'none'}}>Signup</a></b>
        
        </div >
        
        <Container className='p-4'>
      <Row className="justify-content-md-center p-2">
        <Col xs lg="2">
        </Col>
        <Col md="auto">      <ReactPhoneInput 
       inputStyle={{backgroundColor:'white',height:'6vh'}}
       containerStyle={{backgroundColor:'white',height:'6vh'}}
          defaultCountry="nz"
          country='nz'
          onlyCountries={["nz"]}
          localization={{ Germany: "Deutschland", Spain: "España" }}
          countryCodeEditable={false}
          value={phonenumber}
          onChange={phone => setPhoneNumber( phone)}
          inputExtraProps={{
           
            required: true,
            autoFocus: true
          }}
        /></Col>
        <Col xs lg="2">
       </Col>
      </Row>
      <Row className="justify-content-md-center">
      <Col xs lg="2">
        </Col>
        <Col xs lg="3">
        <div class="sub-main">
        {loader?<Spinner animation="border" variant="primary" />:<button onClick={oNNextScreen} class="button-three">Login</button>}

    </div>   
        </Col>
        <Col xs lg="2">
       </Col>
      </Row>
      
    </Container>

        
        </div>
       
    
       
      </div>
    </div>
    <ModalAlert
  message={alertMessage}
  visible={modalVisible}
  onConfirm={closeModal}
    />
    </Container>  )
}
