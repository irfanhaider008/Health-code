import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

var cryptojs = require("crypto-js");

export default function PatientVital() {

  const [loadUrl, setLoadUrl] = useState(null)

  const [user, setUser] = useState(false)
    const {state} = useLocation();
    const navigate = useNavigate();

    const { userid,username,age,status,ethinicity } = state;
    console.log("userID",userid)
    console.log("userID",username)
    console.log("userID",age)
    console.log("userID",status)
    const ethCheck = (element) => element === 491;

    const userval = JSON.parse(localStorage.getItem('spectruminfo'))
    console.log("USERDATA^^^^^",userval)
let ethnicityval = status == "CheckAdd" ?ethinicity.some(ethCheck) : userval?.ethnicity != null ? userval?.ethnicity.some(ethCheck) : true
let halfurl = ethnicityval ? 'yes' : 'no'

    const item = JSON.parse(localStorage.getItem('user'))

    let cryptoJson = {
        'patientId':userid,
        'name': username,
        'token': item?.Aptoken,
        'specturemId':status == "CheckAdd"? userid: item.specturmId,
        'spectureToken': item?.specturmToken,
        'age': age,
        'ethnicity': halfurl
    }
    console.log({cryptoJson})

    let encJson = cryptojs.AES.encrypt(JSON.stringify(cryptoJson), 'my-secret@123').toString()
    let encData = cryptojs.enc.Base64.stringify(cryptojs.enc.Utf8.parse(encJson))
  
    console.log("decrypt", JSON.stringify(encData))

    if (status === "CheckAdd") {

      console.log("hello")
    

      const setUrl = 'https://bcms-healthline.web.app/?patient=' + encData
      console.log("url1", setUrl)
      window.location.href = setUrl;  

      setLoadUrl(setUrl)
      
      setUser(true)

  } else {
     
      const setUrl = 'https://bcms-healthline.web.app/?patient=' + encData
      console.log("url2", setUrl)
      window.location.href = setUrl;  

      setLoadUrl(setUrl)
      setUser(true)
  }
 
  return (
    <div>


    </div>
  )
}
