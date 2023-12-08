import { createContext, useContext, useState, useEffect } from "react";
import { getUserByEmail } from "./api/userApi"
import axiosInstance from "./api/axiosConfig";


const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({children}) => {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  
  const loginUser = async (userData) => {
    console.log(userData)
    const userInfo = await getUserByEmail(userData.email)
    let clubId = null

    if (userInfo.role == 'ROLE_CLUB') {
      await axiosInstance.get(`/club/by-name/${userInfo.firstName}`)
      .then((response) => {
          clubId = response.data.id;
      })
      .catch(console.log("Error id club"))
      }
    

    const data = {
      ...userData,
      role: userInfo.role,
      clubId: clubId 
    };

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));

  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem("user");
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}