import React, { useState, useEffect, Fragment } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from "./button"

export default function Example() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClientIndex, setSelectedClientIndex] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture et la fermeture du menu

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Inverse l'état d'ouverture du menu
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = {
          email: Cookies.get('email'),
          name: Cookies.get('username')
        };
        const res = await axios.post('https://api.gounevps.com/api/search', formData);
        const wines = res.data.wines[0].wines;
  
        if (wines && wines.length > 0) {
          setClients(wines); // Mettre à jour l'état clients avec les données de vin
        } else {
          console.log('Aucun vin trouvé pour cet utilisateur.');
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des données utilisateur:', err);
      }
    };
  
    fetchData();
  }, []);

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
      // Réinitialiser le formulaire après l'envoi réussi (optionnel)
      AddsetFormData({ email: '', castle: '', year: '', quantity: '', type: '' });
      location.reload()
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
    }
  };

  const getQuantityById = (clientId) => {
    if (clientId !== null && clientId >= 0 && clientId < clients.length) {
      return clients[clientId].quantity;
    } else {
      return null; // Retourne null si l'ID de la box est invalide
    }
  };

  const quantityOfSelectedClient = getQuantityById(selectedClientIndex);

  const getCastleById = (clientId) => {
    if (clientId !== null && clientId >= 0 && clientId < clients.length) {
      return clients[clientId].castle;
    } else {
      return null; // Retourne null si l'ID de la box est invalide
    }
  };

  const castleOfSelectedClient = getCastleById(selectedClientIndex);



  const [formData, setFormData] = useState({
    quantity: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const email = Cookies.get("email")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://api.gounevps.com/api/editQuantity', {
        email: email,
        castle: castleOfSelectedClient, // Utiliser la valeur actuelle de castleOfSelectedClient
        newQuantity: formData.quantity,
        currentQuantity: quantityOfSelectedClient
      });
      // Réinitialiser le formulaire après l'envoi réussi (optionnel)
      setFormData({ castle: '', quantity: '' });
      location.reload()
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
    }
  };

  

  const handleDelete = async (index) => {
    try {
      const deletedClient = clients[index];
      const castleToDelete = {
        castleToDelete: deletedClient.castle,
        email: Cookies.get('email')
      }
      await axios.post("https://api.gounevps.com/api/deleteCastle", castleToDelete)
      setClients(clients.filter((_, i) => i !== index));
    } catch (err) {
      console.error('Erreur lors de la suppression du client:', err);
    }
  };

  const handleEditClick = (index) => {
    setSelectedClientIndex(index);
    setShowEditForm(true);
  };

  // Filtrer les clients en fonction du terme de recherche
  const filteredClients = clients.filter(client => {
    return client.castle.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <div className='flex flex-col items-center justify-center pt-24'>
        <input
          id='search'
          type="text"
          placeholder="Rechercher un vin"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='block w-72 lg:w-96 bg-slate-200 rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        />
      </div>  

      <div className='flex flex-col items-center justify-center pt-12 z-50'>
        <button onClick={toggleMenu} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ajouter un vin</button>
        {isOpen && ( // Affiche le menu si isOpen est true
        <>
          
          <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <form onSubmit={AddhandleSubmit}>
            <div className='flex z-100 flex-col pb-14 w-full h-full mt-4 border border-gray-300 rounded-lg w-64 lg:w-96 bg-white'>
              <XMarkIcon className="h-6 w-6 ml-4 mt-4 cursor-pointer" aria-hidden="true" onClick={() => setIsOpen(false)} />
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
                  <input type='text' name="quantity" className='block w-52 bg-slate-200 z-50 pl-2 lg:w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' value={AddformData.quantity} onChange={AddhandleChange}></input>
                </div>

                <div>
                  <label htmlFor="location" className="block font-medium leading-6 text-gray-900">Type de vin</label>
                  <select
                    id="type"
                    name="type"
                    className='block w-52 bg-slate-200 pl-2 lg:w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    value={AddformData.type} 
                    onChange={AddhandleChange}
                  >
                    <option value="-">-</option>
                    <option value="Rouge">Rouge</option>
                    <option value="Blanc">Blanc</option>
                    <option value="Rosé">Rosé</option>
                    <option value="Pétillant">Pétillant</option>
                  </select>
                </div>

                <div className="pt-4">
                  <Button/>
                </div>
              </div>
            </div>
          </form>
          </div> 
        </> 
        )}
      </div>

    <ul role="list" className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 pt-12 pb-44 mx-auto z-0">
    {filteredClients.map((client, index) => (
    <li key={index} className="overflow-hidden rounded-xl border border-gray-200 w-72 lg:w-96">
      <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <div className="text-xl font-medium leading-6 text-gray-900">{client.castle}</div>
        <Menu as="div" className="relative ml-auto z-0">
          <Menu.Button className="-m-2.5 z-0 block p-2.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open options</span>
            <EllipsisHorizontalIcon className="h-5 w-5 z-0" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-0.5 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${active ? 'bg-gray-50' : ''} block px-3 py-1 cursor-pointer text-sm leading-6 text-gray-900`}
                    onClick={() => handleEditClick(index)}
                  >
                    Modifier<span className="sr-only">, {client.castle}</span>
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleDelete(index)}
                    className={`${active ? 'bg-gray-50' : ''} block px-3 py-1 text-sm leading-6 text-gray-900 w-full text-left`}
                  >
                    Supprimer<span className="sr-only">, {client.castle}</span>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Année</dt>
          <dd className="text-gray-700">
            <div className="font-medium text-gray-900">{client.year}</div>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Quantité :</dt>
          <dd className="text-gray-700">
            <div className="font-medium text-gray-900">{client.quantity}</div>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Type de vin :</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">{client.type}</div>
          </dd>
        </div>
      </dl>
    </li>
  ))}
</ul>

      
          {selectedClientIndex !== null && showEditForm && (
              <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <>
                  <form onSubmit={handleSubmit}>
                     <div className='flex bg-white flex-col pb-14 mt-4 mx-auto border border-gray-300 rounded-lg w-64 lg:w-96'>
                        <div className='ml-4 mt-4'>
                          <XMarkIcon className="h-6 w-6 cursor-pointer" aria-hidden="true" onClick={() => setShowEditForm(false)} />
                        </div>
                          <div className='flex flex-col items-center mt-4'>  
                            <h1 className='font-semibold text-center text-xl'>Modifier la quantité pour {castleOfSelectedClient}</h1>
                            <div className='flex flex-col items-center justify-center pt-6'>
                              <label htmlFor="">Quantité (Actuellement : {quantityOfSelectedClient})</label>
                              <input type='text' name="quantity" value={formData.quantity} onChange={handleChange} className='block w-52 bg-slate-200 pl-2 lg:w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'></input>
                            </div>
                          </div>

                          <div className="pt-6 flex items-center justify-center">
                            <Button/>
                          </div>
                      </div>
                  </form>
                </>
              </div>
            )}
    </div>
        );
      }
