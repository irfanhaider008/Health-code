import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import backgroundImage from '../assets/Images/Background.jpg'
import { useNavigate } from 'react-router-dom';
import check from '../assets/Images/check.png'
import uncheck from '../assets/Images/uncheck.png'
import submit from '../assets/Images/submit.png'
import { useDispatch,useSelector } from 'react-redux';
import ModalAlert from '../component/ModalAlert';
import Button from 'react-bootstrap/Button';
import { setSpectrumInfo } from '../toolkit/reducer/Spectruminfo';
import Spinner from 'react-bootstrap/Spinner';



export default function PatientHomes() {
  // const {userdata,loading} =useSelector((state)=>state.data)
  const userval = JSON.parse(localStorage.getItem('user'))
  console.log("USERDATA^^^^^",userval)
  console.log("ID^^^^^",userval?.Aptoken)

  const [loader,setLoader ] =useState(false)

  const [myself,setMySelf] = useState(false)
  const [someone,setSomeone] = useState(false)
  const [value,setValue] = useState(null)
  const [alertMessage,setAlertMessage] =useState(null)
  const [modalVisible,setModalVisible] =useState(false)
  const closeModal = ()=>{
    setModalVisible(false)
}
const [date,setDate] = useState()
const [specInfo,setSpecInfo] = useState()

    const navigate = useNavigate();
    const dispatch = useDispatch();

const spectrumInfo = async()=>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "bearer "+userval?.Aptoken);
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({"PatientUniqueID":userval?.specturmId})
  console.log("RAWWW",raw)
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://us-central1-bcms-covid-check.cloudfunctions.net/covidappdev/dev/healthline/v1/PatientWithPatient", requestOptions)
    .then(response => response.json())
    .then(result => {
    if(result.status==1){
      console.log("RESULT$$$",result?.result)
      dispatch(setSpectrumInfo(result?.result))
      setSpecInfo(result)

      setDate(result?.result?.dateOfBirth)
      
    }
    else{
      // setAlertMessage(result.message)
      // setModalVisible(true)
    }
    })
    .catch(error => {console.log('error', error)
  
  });

}
useEffect(()=>{
  if(userval?.Aptoken){
    spectrumInfo()
  }
  else alert("NO DATA FROM Local Storage")
 
},[userval?.Aptoken])
const onNextScreen =()=>{
 
  if ((specInfo!=null) && (value!=null)) {
    setLoader(true)
    if(value=='Myself'){
      navigate('/patientvital', {state:{   userid: userval?.userid
        ,
        username: userval?.name,
        age: date,Aptoken:userval?.Aptoken,status:"unCheck",ethinicity:null}})
      
      
        }
       if(value=='Someone'){
        navigate('/regfamily',{state:{ userid:userval?.userid
          ,
          username:userval?.name,
          status: "CheckAdd",
          number:  userval?.phoneno,Aptoken:userval?.Aptoken}})
       }
  }
  else {
    setLoader(false)
    setAlertMessage("Please Select an option")
    setModalVisible(true)
    setLoader(false)
  }

}
const goDashboard = ()=>{
  navigate('/dashboard',{state:{   userid: userval?.specturmId,
 Aptoken:userval?.Aptoken}})
}
  return (

<Container>
 <div>
 <div className="banner-image-home">
 <div>
        <span className="tagline">Kia ora {userval?.name}</span>
        
        <div className="tagline-para">
        <div>
         <div onClick={()=>{
        setValue('Myself')
        setMySelf(true)
        setSomeone(false)
      }}>
           {myself? <img src={check} style={{width:'30px'}}/>: <img src={uncheck} style={{width:'30px'}} />}<span  style={{color:'#fff',paddingLeft:'20px'}}>MySelf</span>
      
      </div>
      <div style={{marginTop:'20px'}} onClick={()=>{
        setValue('Someone')
        setMySelf(false)
        setSomeone(true)
      }}>
           {someone? <img src={check} style={{width:'30px'}}/>: <img src={uncheck} style={{width:'30px'}} />}<span  style={{color:'#fff',paddingLeft:'20px'}}>Someone Else</span>
      
      </div>
      </div>    
        </div >
        
        
        <Container className='p-4'>
      <Row className="justify-content-md-center p-2">
        <Col xs lg="2">
        </Col>
        <Col md="auto"></Col>
        <Col xs lg="2">
       </Col>
      </Row>
      <Row className="justify-content-md-center">
      <Col xs lg="2">
        </Col>
        <Col xs lg="3">
        <div className="sub-main">
        {loader?<Spinner animation="border" variant="primary" />: <button  className="button-three" onClick={onNextScreen}>Select</button>}

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
    </Container>
  )
}
