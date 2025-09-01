// services/signupApi.js
import axios from 'axios';

export const signupApi = async (formData) => {
  try {
    const response = await axios.post('http://localhost:4500/api/user/add', formData);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    return null;
  }
};
