import { createContext, useContext, useState, useEffect } from "react";

const BookingContext = createContext();

export const useBookingContext = () => {
  return useContext(BookingContext);
};

export const BookingProvider = ({children}) => {
  const storedBooking = localStorage.getItem("bookingInfo");
  const [bookingInfo, setBookingInfo] = useState(storedBooking ? JSON.parse(storedBooking) : null);
  
  const saveBookingInfo = (data) => {
    setBookingInfo(data);
    localStorage.setItem("bookingInfo", JSON.stringify(data));
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem("bookingInfo");
    };
  }, []);

  return (
    <BookingContext.Provider value={{ bookingInfo, saveBookingInfo }}>
      {children}
    </BookingContext.Provider>
  );
}
