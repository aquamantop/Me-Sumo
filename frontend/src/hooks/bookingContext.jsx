import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [bookingInfo, setBookingInfo] = useState(null);

  const saveBookingInfo = (data) => {
    setBookingInfo(data);
    localStorage.setItem("booking", JSON.stringify(data));
  };

  return (
    <BookingContext.Provider value={{ bookingInfo, saveBookingInfo }}>
      {children}
    </BookingContext.Provider>
  );
};

const useBookingContext = () => {
  return useContext(BookingContext);
};

export { BookingProvider, useBookingContext };
