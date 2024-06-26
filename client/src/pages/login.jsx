import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import AlreadyLoggedIn from '../components/alreadyLoggedIn'
import {CircularProgress} from "@nextui-org/progress";


export default function Example() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.title = "Se connecter";

    const usernameCookie = Cookies.get('username');
    if (usernameCookie) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const naviguate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post('https://api.gounevps.com/api/login', formData)
      .then(res => {
        // Redirection vers une autre page après soumission du formulaire
        naviguate('/cave');
        // Récupération du champ "name" des données de la réponse
        const username = res.data.user.username;
        const email = res.data.user.email
        // Création du cookie avec le champ "name" des données
        Cookies.set('username', username);
        Cookies.set('email', email)
      })
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
    }
  };
  
  const [showLoader, setShowLoader] = useState(false);

  const handleButtonClick = () => {
    setShowLoader(true);
  };


    return (
      <>
        {isLoggedIn ? (
            <AlreadyLoggedIn/>
          ) : (
            <>
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
              Se connecter
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Adresse E-Mail
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    className="block w-full pl-2 bg-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Mot de passe
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Mot de passe oublié ?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                    className="block w-full pl-2 bg-slate-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  onClick={handleButtonClick}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Se connecter 
                </button>

                {showLoader && (
                  <div className='flex items-center justify-center mt-4'>
                    <CircularProgress size='md'strokeWidth={4} color='primary' aria-label="Loading..." />
                  </div>
                )}
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Toujours pas de compte ?{' '}
              <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Créer un compte
              </a>
            </p>
          </div>
          </div>
          </>
        )}

        
      </>
    )
  }
