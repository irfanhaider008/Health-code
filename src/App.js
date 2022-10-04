import React from 'react';
import Nav from './Nav';
import MainRoutes from './Routes'
import "./App.css";




function App() {
  return (
    <div className='container'>
    <Nav/>
     {/** Sidebar */}
     {/* <Sidebar/> */}

     {/** Inner container */}
    <MainRoutes/>
    </div>
  );
}

export default App;
