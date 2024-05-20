import React, { useState, useEffect } from 'react';
import ComingSoon from '../components/comingSoon';
import Nav from "../components/nav";

export default function Consommation() {
    useEffect(() => {
        document.title = "Consommation";

        const fetchDataConsommation = async () => {
            try {
              const formData = {
                email: Cookies.get('email'),
              };
              const res = await axios.post('https://api.gounevps.com/api/searchConsommation', formData);
              console.log(res)
              
            } catch (err) {
              console.error('Erreur lors de la récupération des données utilisateur:', err);
            }
          };
        
          fetchDataConsommation();
    }, []); 

    return (
        <>
            <Nav />
            <ComingSoon />
        </>
    );
}
