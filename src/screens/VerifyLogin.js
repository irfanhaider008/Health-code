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
import { setData } from '../toolkit/reducer/GetData';

export default function VerifyLogin() {
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
  const { screenname,number,phone,accessToken } = state;
  const [loader,setLoader ] =useState(false)

  console.log("ACESSTOKEN 1",accessToken)
  console.log("screenname 1",screenname)

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
const onConfirmOtp = ()=>{
  const _storeData =  (Aptoken, usertoken, userId, specturmId, specturmToken, phoneno, userName, firstName) => {
    try {
        const jsonValue = JSON.stringify({ "Aptoken": Aptoken, "token": usertoken, "userid": userId, "specturmId": specturmId, "specturmToken": specturmToken, "phoneno": phoneno, "name": userName, "firstName": firstName });
const userdata={ "Aptoken": Aptoken, "token": usertoken, "userid": userId, "specturmId": specturmId, "specturmToken": specturmToken, "phoneno": phoneno, "name": userName, "firstName": firstName }
        dispatch(setData(userdata))
        //localStorage.setItem("user", JSON.stringify(jsonValue?.Aptoken))
        navigate("/patienthome")

    } catch (error) {
console.log("Error Store data",error)    }
};
  if (number) {
    setLoader(true)
    
    setIsVerifying(true)
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "phone": number,
      "ipaddress": "192.168.1.1",
      "otp": code
  });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    console.log("raw",raw)

    fetch('https://us-central1-bcms-covid-check.cloudfunctions.net/covidappdev/dev/healthline/v1/signin', requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.status == 1) {
              setLoader(false)

                setIsVerifying(false)
                if (result) {
                  _storeData(result.Aptoken, result.token, result.userid, result.spectrumId, result.specturmToken, result.phone, result.name, result.firstName)
                    // navigate ('/patienthome')
                       
                } 
            }
            else if (result.status == 0) {
              setLoader(false)

                console.log("RESULT COND ELSE IF Result",result.message)
                setIsVerifying(false)
                setAlertMessage(result.message)
                setModalVisible(true)
                
                
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
const onResendCode = ()=>{
  if (number) {
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
               setAlertMessage("Code has been sent")
               setModalVisible(true)
                  setIsVerifying(false)
                  if (result) {
                      console.log({ result })
    
                         
                  } 
              }
              else if (result.status == 0) {
                  console.log("RESULT COND ELSE IF Result",result.message)
                  setIsVerifying(false)
                  setAlertMessage(result.message)
                  setModalVisible(true)
                  
                  
              }
              else {
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
    setAlertMessage("Sorry the phone number you have entered isn't in the correct format. Please try again.")
    setModalVisible(true)
  }

}



  return (
    // <ReactCodeInput type='number' fields={6} {...props}  onChange={text => setCode(text)}/>
    <Container>
    <div>
    <div className="banner-image-about">
    <div>
           <span className="tagline">Login Verification</span>
           
           <div className="tagline-para">
           Please Enter a six digit Verification code

           </div >
           <div className="tagline-para">

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
          
           {loader?<Spinner animation="border" variant="primary" />: <button onClick={onConfirmOtp} class="button-three">Verify</button>}
   
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
