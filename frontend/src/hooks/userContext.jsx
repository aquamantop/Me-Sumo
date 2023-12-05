import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "./api/axiosConfig";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({children}) => {
  const storedUser = localStorage.getItem("user");
  const storedRole = localStorage.getItem("role");
  
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [role, setRole] = useState(storedRole ? JSON.parse(storedRole) : null);
  

  async function getRole(email) {
    const response = await axiosInstance.get(`/user/search-email?email=${email}`);
    setRole(response.data.role);
    localStorage.setItem("role", JSON.stringify(response.data.role));
  }

  async function getClubId(userName) {
    const response = await axiosInstance.get(`/club/by-name/${userName}`);
    setClubId(response.data.id);
    
  }
  
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    getRole(userData.email);
  };

  const logoutUser = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, role, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}
