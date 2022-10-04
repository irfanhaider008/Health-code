// import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

// export const ListAllUsers = createAsyncThunk('GetAllUsers/users',
// async(object,{dispatch,getstate})=>{
//     dispatch(gettingUserList())
//     var requestOptions = {
// method:'GET',
// redirect:'follow'
//     };
//     fetch('https://jsonplaceholder.typicode.com/posts',requestOptions)
//     .then(response => response.json())
//     .then(result=>{
//         console.log('result Post',result);
//         dispatch(gettingUserListSuccess(result))
//     })
//     .catch(error=>{
//       console.log("ERROR POST",error)
//       dispatch(gettingUserListError(error))

//     });
// }
// )
// const getUserSlice = createSlice({
//     name:'GetAllUsers',
//     initialState:{
//         userList:null,
//         userlistloading:false,
//         userListError:false,
//         userListSuccess:false,
//         userListErrorMessage:null,
//         status:'idle'

//     },
//     reducers:{
//         gettingUserList:(state,action)=>{
//             state.userList = null,
//            state.userlistloading=true,
//         state.userListError=false,
//         state.userListSuccess=false,
//         state.userListErrorMessage=null,
//         state.status='loading'
//         },
//         gettingUserListSuccess:(state,action)=>{
//             state.userList = action.payload,
//            state.userlistloading=false,
//         state.userListError=false,
//         state.userListSuccess=true,
//         state.userListErrorMessage=null,
//         state.status='Sucess'
//         },
//         gettingUserListError:(state,action)=>{
//             state.userList = null,
//            state.userlistloading=false,
//         state.userListError=true,
//         state.userListSuccess=false,
//         state.userListErrorMessage=action.payload,
//         state.status='error'
//         },
//     }
// })
// export const {gettingUserListError,gettingUserListSuccess,gettingUserList} = getUserSlice.actions
// export default getUserSlice.reducer;