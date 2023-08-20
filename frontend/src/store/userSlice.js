import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id:'',
    email:'',
    username:'',
    auth:false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            const {_id,email,username,auth} = action.payload;
            state._id = _id;
            state._email = email;
            state._username = username;
            state._auth = auth;
        },
        resetUser:(state,action)=>{
            state.id='';
            state.email='';
            state.username='';
            state.auth=false;
        },
    },

});

export const {setUser,resetUser}=userSlice.actions;

export default userSlice.reducer;