// utils/loginApi.js
import axios from "axios";
import { setUserData } from "../Redux/userSlice";

export const loginApi = async (email, password, navigate, dispatch) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/user/login`,
      {
        mail: email,
        password: password,
      }
    );

    const { user } = response.data;

    const cleanedData = {
      Name: user.details.Name,
      Mail: user.details.Mail,
      PhoneNumber: user.details.PhoneNumber,
      Address: user.details.Address,
      imgURL: user.details.imgURL,
      EmergencyContacts: user.details.EmergencyContacts,
      _id: user.details._id,
    };
    

    dispatch(setUserData(cleanedData)); 
    navigate("/emergency");

    return user;

  } catch (error) {
    console.error("Login failed:", error?.response?.data?.message || error.message);
    return null;
  }
};
