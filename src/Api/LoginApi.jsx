import axios from "axios";
import bcrypt from "bcryptjs";

export const loginApi = async (email, password, navigate) => {
  
    try {
        const response = await axios.get('http://localhost:3000/api/user/fetch');
        
        if (!response || !response.data.data) {
            console.log("Error fetching users");
            return null;
        }

    const hassedpass = async(password)=>{
        const hashedPassword = await bcrypt.hash(password, 10);
        const compared = await bcrypt.compare(password, hashedPassword);

        if (compared) {
            console.log("Password matches");
            console.log(compared)
            return hashedPassword
        } else {
            console.log("Password does not match");
        }

    }
    
        const user = response.data.data.find((user) => user.email === email);
        
        if (user) {
           
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                navigate("/emergency");
                
                
                hassedpass(password)
                
                console.log("Login successful");
                return user;
            } else {
                console.log("Invalid password");
                return null;
            }
        } else {
            console.log("User not found");
            return null;
        }

    } catch (error) {
        console.error("Error during login:", error);
        return null;
    }
};

