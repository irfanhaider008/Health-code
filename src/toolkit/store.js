import { configureStore } from "@reduxjs/toolkit";
import Getdata  from "./reducer/GetData";
import Spectruminfo from "./reducer/Spectruminfo";


export default configureStore({
    reducer:{
       
        data:Getdata,
        spectrum:Spectruminfo

    },
});