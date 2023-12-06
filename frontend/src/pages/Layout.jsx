import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import "./styles/layout.css"

const Layout = ({ children }) => {
  return (
    <>
    <div className="layout-container">
        <Header />
        <div className="content-container">    
            {children}
        </div>    
        <Footer />
      </div>
    </>
  )
}

export default Layout;
