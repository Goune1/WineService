import axios from 'axios';
import Cookies from 'js-cookie';
import Button from './button'
import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

function NewBottle() {
  const [AddformData, AddsetFormData] = useState({
    email: Cookies.get('email'),
    castle: '',
    year: '',
    quantity: '',
    type: ''
  });

  const AddhandleChange = (e) => {
    AddsetFormData({ ...AddformData, [e.target.name]: e.target.value });
  };

  const AddhandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.gounevps.com/api/addWine', AddformData);
      console.log(response.data); // Afficher la réponse du serveur (optionnel)
      // Réinitialiser le formulaire après l'envoi réussi (optionnel)
      AddsetFormData({ email: '', castle: '', year: '', quantity: '', type: '' });
      location.reload()
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
    }
  };

  return (
    <>
    <form onSubmit={AddhandleSubmit}>
        <div className='flex flex-col pb-14 mt-4 items-center mx-auto  border border-gray-300 rounded-lg w-64 lg:w-96 bg-white'>
        <XMarkIcon className="h-6 w-6" aria-hidden="true" onClick={() => isOpen(false)} />
              <div className='flex flex-col gap-4 items-center pt-8'>
                <div>
                  <label htmlFor="">Nom du chateau</label>
                  <input type="text" className='block w-52 bg-slate-200 pl-2 lg:w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' name="castle" value={AddformData.castle} onChange={AddhandleChange} />
                </div>

                <div>
                  <label htmlFor="">Année</label>
                  <input type="text" className='block w-52 pl-2 bg-slate-200 lg:w-72 rounded-md borde ar-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' name="year" value={AddformData.year} onChange={AddhandleChange} />
                </div>

                <div>
                  <label htmlFor="">Quantité</label>
                  <input type='text' name="quantity" className='block w-52 bg-slate-200 pl-2 lg:w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' value={AddformData.quantity} onChange={AddhandleChange}></input>
                </div>

                <div>
                  <label htmlFor="">Type de vin</label>
                  <input type='text' name="type" className='block w-52 bg-slate-200 pl-2 lg:w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' value={AddformData.type} onChange={AddhandleChange}></input>
                </div>

                <div className="pt-4">
                  <Button/>
                </div>
              </div>
        </div>
    </form>
    </>
  );
}

export default NewBottle;
