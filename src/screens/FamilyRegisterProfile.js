import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import backgroundImage from '../assets/Images/Background.jpg'
import { useNavigate } from 'react-router-dom';
import './style.css';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import next from '../assets/Images/next.png'
import Modal from 'react-bootstrap/Modal';
import ModalAlert from '../component/ModalAlert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Multiselect from 'multiselect-react-dropdown';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker  } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import check from '../assets/Images/check.png'
import uncheck from '../assets/Images/uncheck.png'
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';

export default function FamilyRegisterProfile() {
  const [loader,setLoader ] =useState(false)

  const [ethnicityLookupsData, setEthnicityLookupsData] = useState([]);
  const {state} = useLocation();
  const { userid,username,number,status,Aptoken } = state;
  console.log("UI D1",userid)
    console.log("USERNAME 1",username)
    console.log("APTOKEN 1",Aptoken)

    console.log("Number 1",number)
    const [phonenumber,setPhoneNumber] = useState()
    const [isVerifying, setIsVerifying] = useState(false);
    const [enterNumber, setEnterNumber] = useState('');
    const [alertMessage,setAlertMessage] =useState(null)
    const [firstname,setFirstName] =useState(null)
    const [lastname,setLastName] =useState(null)
    const [modalVisible,setModalVisible] =useState(false)

    const [date, setDate] = React.useState(dayjs());
    const [maleGender, setMaleGender] = useState(false);
    const [femaleGender, setFemaleGender] = useState(false);

    const [genderval,setGenderVal] = useState(null);
    const [diverseGender, setDiverseGender] = useState(false);
    const [notAnsGender, setNotAnsGender] = useState(false);
    const [relationArray, setrelationArray] = useState();
    const [relationval, setRelationval] = useState(null);
    const [ethinicityList,setEthincityList] =useState([])

    const arrArr = ethinicityList?.map(x => (x?.name));
    const arrArrID = ethinicityList?.map(x => (x?.id));
    console.log("ARRARRID",arrArrID);

    console.log("ARRAR",arrArr);


console.log("DATEEE",relationArray)
console.log("RELATIONSHIP",relationval?.value)

    
    const closeModal = ()=>{
        setModalVisible(false)
    }
    let responseArr = [];
    const [tokenforuser, setTokenForUser] = useState('')
console.log("TOKEN",tokenforuser)
    const getAccessToken = () => {
      var myHeaders = new Headers();
      
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({ "ContactNumber": number });
      console.log("Raw Spectrum Number", raw)
   
          var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
          };
          fetch("https://us-central1-bcms-covid-check.cloudfunctions.net/covidappdev/dev/healthline/v1/GetToken", requestOptions)
              .then(response => response.json())
              .then(result => {
                 
                  setTokenForUser(result.accessToken)
                  
              })
              .catch(error => {
                  console.log('error from Get Token', error)
              });
      
  }


  useEffect(() => {
    
      getAccessToken()
   

  }, [])

    const navigate = useNavigate();
    const getRelationLookUps = () => {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "bearer "+Aptoken);
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch("https://us-central1-bcms-covid-check.cloudfunctions.net/covidappdev/dev/healthline/v1/Relationships", requestOptions)
        .then(response => response.json())
        .then(result => {console.log("result%%%%",result.result)
        setrelationArray(result.result)
        
        })
        .catch(error => console.log('error', error));
      
  }
    const getEthncityLookUps = () => {

      fetch("https://us-central1-bcms-covid-check.cloudfunctions.net/covidappdev/dev/healthline/v1/Ethnicity")
          .then(response => response.json())
          .then(result => {
              console.log("COVID ETHINICTY$$$",result.result)
              result.result.map((item, index) => {
                 
                  if (item.text == 'NZ Maori') {
                      let obj = {
                          "name": "NZ Māori",
                          "id": item.value
                      }
                      responseArr.push(obj);
                  }
                  else if(item.text=='Refused to answer'){
                      let obj = {
                          "name": "Prefer not to answer",
                          "id": item.value
                      }
                      responseArr.push(obj);
                  }
                  else if(item.text=='Cook Islands Maori'){
                      let obj = {
                          "name": "Cook Islands Māori",
                          "id": item.value
                      }
                      responseArr.push(obj);
                  }
                  else {
                      let obj = {
                          "name": item.text,
                          "id": item.value

                      }
                      responseArr.push(obj);

                  }
              })
              console.log("respEth",responseArr)
              setEthnicityLookupsData(responseArr)
          })
          .catch(error => console.log('error Ethinicity', error));

  }

    useEffect(()=>{
      getEthncityLookUps();
      getRelationLookUps();
    },[])
    const onSubmit = ()=>{
      if(firstname==null || lastname==null || genderval==null || ethinicityList==null)  {
        setModalVisible(true)
      }   
      else{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "bearer "+Aptoken);
        myHeaders.append("Content-Type", "application/json");
        let fullname = firstname +" "+lastname
      var raw = JSON.stringify({
          "patientUniqueID": "null",
          "token": tokenforuser,
          "firstName": firstname,
          "lastName": lastname,
          "dateOfBirth":moment(date).format("YYYY-MM-DD")+'T00:00:00+00:00',
          "relationshipID":relationval?.value,
          "gender": genderval,
          "ethnicity": arrArrID,
          "contactNumber": number,
          "vacinationStatus": "Deses 2",
          "livingAlone": "yes",
          "pregnant": "no",
          "address": {
            "fullAddress": "",
            "houseNO": "489",
            "streetAddress": "",
            "building": "",
            "suburbTownID": 0,
            "cityAreaID": 0,
            "postCodeID": 0,
            "dhbCode": "",
            "dhbName": ""
          }
        });
        console.log("first Name",firstname+lastname)
      console.log("FAMILY RAW",raw)
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://us-central1-bcms-covid-check.cloudfunctions.net/covidappdev/dev/healthline/v1/Patient", requestOptions)
  .then(response => response.text())
  .then(result => {console.log("result FAMILY REG",result)
  let a = JSON.parse(result)

  if (a?.error == null) {
let a = JSON.parse(result)
console.log("ID$$$",a?.id)
console.log("INFO",a?.id,fullname,moment(date).format("YYYY-MM-DD")+'T00:00:00+00:00',arrArr)
    navigate('/patientvital',{state:{ userid:a?.id,
      username:fullname,
      status: "CheckAdd",age:moment(date).format("YYYY-MM-DD")+'T00:00:00+00:00',
      ethinicity:arrArr}})
  }

})
  .catch(error => console.log('error', error));
      }

    }

    console.log("RELATIONSHIP",relationval?.title)
    // let dateval = date?.$d
    // let a =dateval.toString().split("GMT")[0]
    // let b= a.replace(/\s+$/, '')
    // let c= b.replace(/ /g,"-")
    console.log("DATE%%%^^^",moment(date).format("YYYY-MM-DD")+'T00:00:00+00:00')
    var raw = JSON.stringify({
      "patientUniqueID": "null",
      "token": tokenforuser,
      "firstName": firstname,
      "lastName": lastname,
      "dateOfBirth":moment(date).format("YYYY-MM-DD")+'T00:00:00+00:00',
      "relationshipID":relationval?.value,
      "gender": genderval,
      "ethnicity": arrArrID,
      "contactNumber": number,
      "vacinationStatus": "Deses 2",
      "livingAlone": "yes",
      "pregnant": "no",
      "address": {
        "fullAddress": "",
        "houseNO": "489",
        "streetAddress": "",
        "building": "",
        "suburbTownID": 0,
        "cityAreaID": 0,
        "postCodeID": 0,
        "dhbCode": "",
        "dhbName": ""
      }
    });
    console.log("FAMILY RAW DATA LIST",raw)
  return (
  
<Container>
 <div>
 <div className="banner-image-home">
 <div>
        <span className="tagline">Add Memeber</span>
        
        <div className="tagline-para">
        Please enter information below.
        </div >
       
       
        <Container className='p-4'>
      <Row className="justify-content-md-center p-2">
        <Col xs lg="2"> 
        
        <Col sm={10}>
          <Form.Control type="name" placeholder="First Name" onChange={(text)=>{setFirstName(text.target.value)}
          
          }/>
        </Col>
        </Col>
        <Col xs lg="2">          <Form.Control type="name" placeholder="Last Name" onChange={(text)=>setLastName(text.target.value)}/>

        </Col>
        <Col xs lg="2"> <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        renderInput={(props) => <TextField {...props} style={{borderRadius:'10px',color:'#fff',backgroundColor:'#fff',borderColor:'#fff'}} />}
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
      />
    </LocalizationProvider> 

        </Col>
        <Col md="auto">  <Multiselect  placeholder='Select Relationship' style={{color:'#fff',}} singleSelect={true} className='multiselectContainer'
  options={relationArray}
  displayValue='title'
  onSelect={(selectedList, selectedItem)=>{
    setRelationval(selectedItem)
console.log("SELECTED",selectedItem)

  }}
/> </Col>
       
      </Row>
      <Row className="justify-content-md-center p-2">
      <Col md="auto">
      <Multiselect placeholder='Select Ethincity' style={{color:'#fff',}} className='multiselectContainer'
  options={ethnicityLookupsData}
  displayValue='name'
  onSelect={(selectedList, selectedItem)=>{
    setEthincityList(selectedList)
 
    
    // console.log("SELECTED",selectedItem)
    console.log("SELECTED",selectedList)


  }}
/>  </Col>
       
      
      </Row>
      <Row className="justify-content-md-center">
      <Col xs lg="2">
        <div style={{marginTop:'20px'}} onClick={()=>{
  setFemaleGender(false)
  setMaleGender(true)
  setNotAnsGender(false)
  setDiverseGender(false)
   setGenderVal("Male")      }}>
           {maleGender? <img src={check} style={{width:'30px'}} />: <img src={uncheck} style={{width:'30px'}} />} <span  style={{color:'#fff',paddingLeft:'20px'}}>Male</span>
      
      </div>
       </Col>
        <Col xs lg="2"> <div style={{marginTop:'20px'}} onClick={()=>{
  setFemaleGender(true)
  setMaleGender(false)
  setNotAnsGender(false)
  setDiverseGender(false)
   setGenderVal("Female")      }}>
           {femaleGender? <img src={check} style={{width:'30px'}} />: <img src={uncheck} style={{width:'30px'}} />} <span  style={{color:'#fff',paddingLeft:'20px'}}>Female</span>
      
      </div>
           
        </Col>
        <Col xs lg="2">
        <div style={{marginTop:'20px'}} onClick={()=>{
  setFemaleGender(false)
  setMaleGender(false)
  setNotAnsGender(false)
  setDiverseGender(true)
   setGenderVal("Gender Diverse")      }}>
           {diverseGender? <img src={check} style={{width:'30px'}} />: <img src={uncheck} style={{width:'30px'}} />} <span  style={{color:'#fff',paddingLeft:'20px'}}>Gender Diverse</span>
      
      </div>
       </Col>

       <Col xs lg="2">
       <div style={{marginTop:'20px'}} onClick={()=>{
  setFemaleGender(false)
  setMaleGender(false)
  setNotAnsGender(true)
  setDiverseGender(false)
   setGenderVal("Prefer not to answer")      }}>
           {notAnsGender? <img src={check} style={{width:'30px'}} />: <img src={uncheck} style={{width:'30px'}} />} <span  style={{color:'#fff',paddingLeft:'20px'}}>Prefer not to Answer</span>
      
      </div>
       </Col>
      </Row>
      <Row className="justify-content-md-center">
      <Col xs lg="2">
        </Col>
        <Col xs lg="3">
        <div class="sub-main">
        {loader?<Spinner animation="border" variant="primary" />: <button onClick={onSubmit} class="button-three">Submit</button>}

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
  message={"Please fill all fields"}
  visible={modalVisible}
  onConfirm={closeModal}
    />
    </Container> 
    
    
    
    )
}
