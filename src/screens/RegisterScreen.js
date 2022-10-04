import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import backgroundImage from '../assets/Images/Background.jpg'
import { useNavigate } from 'react-router-dom';
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import next from '../assets/Images/next.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalAlert from '../component/ModalAlert';
import Spinner from 'react-bootstrap/Spinner';



export default function RegisterScreen() {
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
    console.log
    ("Number",phonenumber)
    const navigate = useNavigate();


    useEffect(()=>{
 setNumber("+"+phonenumber)
 console.log("PLUS NUM",number)
    },[phonenumber])

    const codeVerification = ()=>{
       
            if (number) {
                setLoader(true)
                setIsVerifying(true)
                var myHeaders = new Headers();
    
                myHeaders.append("Content-Type", "application/json");
    
                var raw = JSON.stringify({
                    "ContactNumber": number,//number
                });
    
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                console.log("Raw from Verify Number", raw)
                fetch('https://us-central1-bcms-covid-check.cloudfunctions.net/covidappdev/dev/healthline/v1/GetToken', requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result.status == true) {
                            setLoader(false)
                            sendOTP(result.accessToken)
                            console.log("result from Code Verification", result)
                            console.log("result access", result.accessToken)
    
                        }
                        else {
                            setLoader(false)

                            setIsVerifying(false)
                            setAlertMessage(result.message)
                            setModalVisible(true)
                        }
                    })
                    .catch(error => {
                        console.log('error', error)
                    });
            } else {

                setAlertMessage("Sorry the phone number you have entered isn't in the correct format. Please try again.")
                setModalVisible(true)
                setLoader(false)

            }
        }
    console.log("OTP",number)
        const sendOTP = (token) => {
            setIsVerifying(true)
            var myHeaders = new Headers();
    
            myHeaders.append("Content-Type", "application/json");
    
            var raw = JSON.stringify({
                "phone": number,
                "ipaddress": "192.168.1.1",
                "accessToken": token
            });
    
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
    
            fetch('https://us-central1-bcms-covid-check.cloudfunctions.net/covidappdev/dev/healthline/v1/sendotpforregistration', requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if (result.status == 1) {
                        console.log("result from sendOtp", result)
                        navigate ('/verify', { state: {     accessToken: token,
                            number: number,
                            screename: 'signup',
                            phone:number, } });
                       
                        setIsVerifying(false)
                      
    
                    }
                    if (result.status == 0) {
                        setAlertMessage(result.message)
                        setModalVisible(true)
                        setIsVerifying(false)
                    }
                    else {
                        setIsVerifying(false)
                       setAlertMessage(result.message)
                        setModalVisible(true)
                    }
                })
                .catch(error => {
    
                    console.log('error', error)
                    alert("There was an error processing your request. Please try again later. If issues presists please contact support.")
                    setIsVerifying(false)
                });
        
        
        }
  return (
    <Container>
    <div>
    <div className="banner-image-about">
    <div>
           <span className="tagline">Signup</span>
           
           <div className="tagline-para">
           It will take a few minutes to register and then login.
           
           </div >
           <div className="tagline-para">
           Please enter your mobile number below and click 'Next'
           
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
           {loader?<Spinner animation="border" variant="primary" />:<button onClick={codeVerification} class="button-three">Next</button>}
   
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
