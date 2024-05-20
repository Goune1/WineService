import React, { useState, useEffect } from 'react';
import List from "../components/list";
import Nav from "../components/nav"
import Cookies from 'js-cookie';
import NotLoggedIn from '../components/notLoggedIn'
import Footer from "../components/footer"


function Cave() {
  useEffect(() => {
    document.title = "Votre Cave";

    const usernameCookie = Cookies.get('username');
    if (usernameCookie) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); 

  const [isOpen, setIsOpen] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  

  return (
    <>
      {isLoggedIn ? (
        <>
          <Nav/>

          <div className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl text-center pt-14">
            <span className="text-neutral-950">Votre </span>
            <span className="text-indigo-600">Cave</span>
          </div>
  
          <List/>

          <Footer/>
        </>
      ) : (
        <>
          <Nav/>

          <NotLoggedIn/>
        </>
      )}

      
    </>
  )
}

export default Cave;
