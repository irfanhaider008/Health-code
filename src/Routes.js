import React from "react"
import {Routes, Route, Navigate} from "react-router-dom"
import InnerContent from "./components/InnerContent"

import ProtectedRoutes from "./components/ProtectedRoutes"
import PublicRoutes from "./components/PublicRoutes"
import PatientHome from "./screens/PatientHome"
import PatientVital from "./screens/PatientVital"
import Dashboard from "./screens/Dashboard"
import FamilyRegisterProfile from "./screens/FamilyRegisterProfile"
import RegisterProfile from "./screens/RegisterProfile"
import NotFound from "./screens/NotFound"
import VerifyLogin from "./screens/VerifyLogin"
import RegisterScreen from "./screens/RegisterScreen"
import Verify from "./screens/Verify"
import RegisterCompleted from "./screens/RegisterCompleted"
import InitalScreen from "./screens/InitalScreen"
import LoginScreen from "./screens/LoginScreen"

const MainRoutes = () => (
	<Routes>

		<Route path="/" element={<ProtectedRoutes />}>
			<Route path="/" element={<InnerContent />}>
			<Route path="/patienthome" element={<PatientHome/>} />   
        <Route path="/regfamily" element={<FamilyRegisterProfile/>} /> 
              <Route path="/patientvital" element={<PatientVital/>} />   
              <Route path="/dashboard" element={<Dashboard/>} />  
              <Route path="*" element={<NotFound/>} />  
			</Route>
		</Route>

		{/** Public Routes */}
		{/** Wrap all Route under PublicRoutes element */}
	
		<Route path="/" element={<PublicRoutes />}>
		<Route path="/inital" element={<InitalScreen/>} />

			<Route path="/login" element={<LoginScreen />} />
      <Route path="/verlogin" element={<VerifyLogin/>} />      
      <Route path="/register" element={<RegisterScreen/>} />      
      <Route path="/verify" element={<Verify/>} />      
	  <Route path="/regprofile" element={<RegisterProfile/>} />      

      <Route path="/regcompleted" element={<RegisterCompleted/>} /> 
      <Route path="*" element={<NotFound/>} />  
		</Route>

		{/** Permission denied route */}
		
	</Routes>
)

export default MainRoutes
