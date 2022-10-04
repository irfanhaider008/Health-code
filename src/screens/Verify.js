import React,{ useState }from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import backgroundImage from '../assets/Images/Background.jpg'
import logo from '../assets/Images/logo.jpeg'
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import submit from '../assets/Images/submit.png'
import banner from '../assets/Images/HL_image2.jpg'
import Modal from 'react-bootstrap/Modal';
import ModalAlert from '../component/ModalAlert';
import { useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';



import ReactCodeInput from 'react-code-input';
import { useDispatch,useSelector } from 'react-redux';

export default function Verify() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [enterNumber, setEnterNumber] = useState('');
  const [alertMessage,setAlertMessage] =useState(null)
  const [modalVisible,setModalVisible] =useState(false)
  const [loading, setLoading] = useState(false);

  const [code,setCode] = useState(null)
  console.log("CODE###",code)
  const closeModal = ()=>{
      setModalVisible(false)
  }
  const {state} = useLocation();
  const { number,phone,accessToken } = state;

  console.log("ACESSTOKEN 1",accessToken)

  console.log("number 1",number)

    const props = {
        inputStyle: {
          fontFamily: 'monospace',
          margin:  '4px',
          MozAppearance: 'textfield',
          width: '40px',
          borderRadius: '3px',
          fontSize: '14px',
          height: '26px',
          paddingLeft: '7px',
          backgroundColor: 'white',
          color: '#000',
          border: '1px solid lightskyblue'
        },
        inputStyleInvalid: {
          fontFamily: 'monospace',
          margin:  '4px',
          MozAppearance: 'textfield',
          width: '40px',
          borderRadius: '3px',
          fontSize: '14px',
          height: '26px',
          paddingLeft: '7px',
          backgroundColor: 'black',
          color: 'red',
          border: '1px solid red'
        }
      }

    const dispatch =useDispatch();
    const navigate = useNavigate();

    const codeVerification = (value) => {
      console.log("access code line 35",accessToken)
      console.log("value",value)
      // setValue(props.route.params.accessToken)
      // console.log("value", value)
      // console.log("email", props.route.params)
      setIsVerifying(true)
      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
          "ContactNumber": number,
          "Token": accessToken,
          "otp":code
      });

      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };

      console.log("Raw from Verify ", raw)
      fetch("https://us-central1-bcms-covid-check.cloudfunctions.net/covidappdev/dev/healthline/v1/VerifyToken", requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log("result is from Code Verificatoin", result)
              if (result.status == true) {
                  console.log({ result })
                  setIsVerifying(false)
                      navigate ('/regprofile',{state:{
                        number:number,
                        token: accessToken,
                        otp: code
                      }})
                

                  

                 
              }
              else {
                  setIsVerifying(false)
              }
          })
          .catch(error => console.log('error', error));
        }
  
    const RegisterProfileOtpVerification = () => {      
        setIsVerifying(true)
        setLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          
            "phone":number,
            "otp": code
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://us-central1-bcms-covid-check.cloudfunctions.net/covidappdev/dev/healthline/v1/otpverification", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("result from otpVerification", result)
                if (result.status == 1) {
                    setLoading(false)
                    codeVerification(code)
                    navigate ('/regprofile',{state:{
                      number:number,
                      token: accessToken,
                      accessToken: accessToken,
                      otp: code
                    }})
                     
                } else {
                  console.log("RESULT CODE",result)
                    setLoading(false)
                    setAlertMessage(result.message)
                    setModalVisible(true)
                                }

                setIsVerifying(false)

            })

            .catch(error => {
                console.log('error from code Verify', error)
                console.log('error', JSON.stringify(error))
            });
            setIsVerifying(false)
    }
    const onResendCode = ()=>{
      if (number) {
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
                    sendOTP(result.accessToken)
                    console.log("result from Code Verification", result)
                    console.log("result access", result.accessToken)

                }
                else {

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
              setAlertMessage("Code has been sent")
              setModalVisible(true)
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
           <span className="tagline">SignUp Verification</span>
           
           <div className="tagline-para">
           Please Enter a six digit Verification code

           </div >
  
           <Container className='p-4'>
         <Row className="justify-content-md-center p-2">
           <Col xs lg="2">
           </Col>
           <Col md="auto">     
           <ReactCodeInput type='number' fields={6} {...props}  onChange={text => setCode(text)}/>
     <button onClick={onResendCode} style={{color:'#fff',fontSize:'14px',backgroundColor:'#1980AB',padding:'4px',borderRadius:'5px',borderColor:'#fff'}}>Resend Code</button>


           </Col>
           <Col xs lg="2">
          </Col>
         </Row>
         <Row className="justify-content-md-center">
         <Col xs lg="2">
           </Col>
           <Col xs lg="3">
           <div class="sub-main">
           {loading?<Spinner animation="border" variant="primary" />:   <button onClick={RegisterProfileOtpVerification} class="button-three">Verify</button>}
   
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
       </Container>   )
}
