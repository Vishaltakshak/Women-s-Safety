// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Name: '',
  Mail: '',
  PhoneNumber: '',
  Address: '',
  imgURL: '',
  EmergencyContacts: [],
  _id:"",

};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return { ...state, ...action.payload};
    },
    clearUserData: () => initialState,
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
