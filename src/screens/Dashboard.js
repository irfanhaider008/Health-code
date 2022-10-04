import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import backgroundImage from '../assets/Images/Background.jpg'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';



export default function Dashboard() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const { userid,Aptoken } = state;
    const [loader,setLoader ] =useState(true)

    const [info,setInfo] = useState()

  
    console.log("UI D1",userid)
    console.log("Token 1",Aptoken)
    const loadRecord = ()=>{
        var myHeaders = new Headers();
myHeaders.append("Authorization", "bearer " + Aptoken);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "PatientUniqueID": userid
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://us-central1-bcms-covid-check.cloudfunctions.net/covidappdev/dev/healthline/v1/QuestionnaireWithPatient", requestOptions)
  .then(response => response.text())
  
  .then(result => {console.log("result DASHBOARD$$$$",result)
  setLoader(false)
  
   setInfo(JSON.parse(result))
})
  .catch(error => console.log('error', error));
    }
  useEffect(()=>{
loadRecord();
  },[])

  useEffect(()=>{
    let arr =info?.result
    console.log("DATAAA@@",info?.result)


  },[info])

//   {info.map(product => (
// console.log('TITLE',product.score)
// ))} 
  return (
//       <Container fluid style={{ backgroundImage: `url(${backgroundImage})`,
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     width: '100vw',
//     height: '100vh'}} className='p-5'>

// <Row className="justify-content-center">
//   {loader?<Spinner animation="border" variant="danger" />:null
// }

//     <Col>
//     <Container fluid className='p-2'>
//   <Row >
//     <Col style={{disply:'flex', justifyContent:'left'}}>
//     </Col>
//     <Col></Col>
//     <Col> <Button onClick={logoutCall} variant="success">Logout</Button>
// </Col>
//   </Row>
//   </Container>
//     <Container fluid className='p-2'>
//  <div>
//   <Table striped bordered hover class="table table-striped table-bordered ">
//       <thead>
//         <tr>
//           <th>#</th>
//           <th>First Name</th>
//           <th>Last Name</th>
//           <th>Date Submitted</th>
//           <th>Score</th>
         
//         </tr>
//       </thead>
//      <tbody>
//     {info.result.map((value,index)=>(
//         <tr>
//             <th scope='row'>{index + 1}</th>
//             <td>{value.firstName}</td>
//             <td>{value.lastName}</td>
//             <td>{value.insertedAt}</td>
//             <td>{value.score}</td>

//         </tr>
//     ))}
        
//      </tbody>
//     </Table> 
//    </div>
//          </Container> 
//        </Col>
// </Row>

//     </Container>



<Container>
 <div>
 <div className="banner-image-dashboard">
 <div>
        <span className="tagline">Records</span>
        
        <div className="tagline-para">
        Here you can see your Submissions.
        
        </div >
      
        <Container className='p-4'>
        {loader?<Spinner animation="border" variant="danger" />:null}
      <Row className="justify-content-md-center p-2">

      {info?.result?.map((value,index)=>( <Card  style={{ width: '18rem',backgroundColor:'#1980AB',color:'#fff',margin:'5px'}}>
  <Card.Body>
    <Card.Title>{value?.firstName} {value?.lastName}</Card.Title>
    {value.insertedAt}
 <Card.Text>
      Submitted Successfully
    </Card.Text>
  </Card.Body>
</Card>))}

<Card  style={{ width: '18rem',backgroundColor:'#1980AB',color:'#fff',margin:'5px'}}>
  <Card.Body>
    <Card.Title>Muhammad Ali</Card.Title>
    23
 <Card.Text>
     werr
    </Card.Text>
  </Card.Body>
</Card>
<Card  style={{ width: '18rem',backgroundColor:'#1980AB',color:'#fff',margin:'5px'}}>
  <Card.Body>
    <Card.Title>Muhammad Ali</Card.Title>
    23
 <Card.Text>
     werr
    </Card.Text>
  </Card.Body>
</Card>
<Card  style={{ width: '18rem',backgroundColor:'#1980AB',color:'#fff',margin:'5px'}}>
  <Card.Body>
    <Card.Title>Muhammad Ali</Card.Title>
    23
 <Card.Text>
     werr
    </Card.Text>
  </Card.Body>
</Card>
<Card  style={{ width: '18rem',backgroundColor:'#1980AB',color:'#fff',margin:'5px'}}>
  <Card.Body>
    <Card.Title>Muhammad Ali</Card.Title>
    23
 <Card.Text>
     werr
    </Card.Text>
  </Card.Body>
</Card>

      </Row>
      <Row className="justify-content-md-center">
      <Col xs lg="2">
        </Col>
        <Col xs lg="3">
        <div class="sub-main">
        {/* {loader?<Spinner animation="border" variant="primary" />:<button onClick={oNNextScreen} class="button-three">Login</button>} */}

    </div>   
        </Col>
        <Col xs lg="2">
       </Col>
      </Row>
      
    </Container>

        
        </div>
       
    
       
      </div>
    </div>
    
    </Container>   )
}
