import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const setSpectrumInfo =createAsyncThunk("spectrum/getSpectrum",async(data)=>{
    const dataval =localStorage.setItem('spectruminfo', JSON.stringify(data));

    console.log("DATAVAL",data)


    return dataval

    
});

const Spectruminfo = createSlice({
    name:"data",
    initialState:{
        posts:[],
        loading:false,
        userdata:"Hello",
    },
    extraReducers:{
        [setSpectrumInfo.pending] : (state,action)=>{
            state.loading=true;

        },
        [setSpectrumInfo.fulfilled]: (state,action)=>{
            state.loading = false;
            state.userdata = action.payload;
        },
        [setSpectrumInfo.rejected]:(state,action)=>{
            state.loading= false;

        },

    },
});
export default setSpectrumInfo.reducer;