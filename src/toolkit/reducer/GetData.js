import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const setData =createAsyncThunk("data/getData",async(data)=>{
    const dataval =localStorage.setItem('user', JSON.stringify(data));

    console.log("DATAVAL",data)


    return dataval

    
});

const GetData = createSlice({
    name:"data",
    initialState:{
        posts:[],
        loading:false,
        userdata:"Hello",
    },
    extraReducers:{
        [setData.pending] : (state,action)=>{
            state.loading=true;

        },
        [setData.fulfilled]: (state,action)=>{
            state.loading = false;
            state.userdata = action.payload;
        },
        [setData.rejected]:(state,action)=>{
            state.loading= false;

        },

    },
});
export default GetData.reducer;