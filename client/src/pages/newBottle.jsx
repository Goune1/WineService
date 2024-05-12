import { useState } from 'react';
import axios from 'axios';
import Nav from '../components/nav'
import Button from '../components/buttons_with_trailing_icon'

function NewBottle() {
  const [formData, setFormData] = useState({
    castle: '',
    year: '',
    quantity: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/addWine', formData);
      console.log(response.data); // Afficher la réponse du serveur (optionnel)
      // Réinitialiser le formulaire après l'envoi réussi (optionnel)
      setFormData({ castle: '', year: '', quantity: '' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
    }
  };

  return (
    <>
    <Nav/>

    <form onSubmit={handleSubmit}>
        <div className='flex flex-col pl-24 pb-14 mt-24 bg-slate-400 items-center'>
            <label htmlFor="">Nom du chateau</label>
            <input type="text" className='block w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' name="castle" value={formData.castle} onChange={handleChange} />
            <label htmlFor="">Année</label>
            <input type="text" className='block w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' name="year" value={formData.year} onChange={handleChange} />
            <label htmlFor="">Quantité</label>
            <input type='text' name="quantity" className='block w-52 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' value={formData.quantity} onChange={handleChange}></input>
            <div className="pt-4">
                <Button/>
            </div>
        </div>
    </form>
    </>
  );
}

export default NewBottle;
