import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie';

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Cave', href: '/cave' },
  { name: 'Consommation', href: '/consommation' }
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const usernameCookie = Cookies.get('username');
    if (usernameCookie) {
      setIsLoggedIn(true);
      setUsername(usernameCookie);
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  }, []);

  const handleLogout = () => {
    // Supprimer le cookie de l'utilisateur
    Cookies.remove('username');
    Cookies.remove('email')
    Cookies.remove('connect.sid')
  };


  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-8xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex items-center gap-x-12">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="image/logo.png" alt="" />
          </a>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600">
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className="flex lg:hidden">
          {isLoggedIn ? (
            <span className='pr-1'>Bonjour, {username} !</span>
          ) : (
            null
          )}
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex">
          <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
          {isLoggedIn ? (
            <span>Bonjour, {username} !</span>
          ) : (
            <a href="/login">Se connecter <span aria-hidden="true">&rarr;</span> </a> 
          )}
          </a>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="../public/image/logo.png"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                  {isLoggedIn ? (
                  <>
                  <div className='flex flex-col gap-4'>
                    <a href="/" onClick={handleLogout}>Déconnexion</a>
                  </div>
                  </>
                  ) : (
                  <a href="/login">Se connecter <span aria-hidden="true">&rarr;</span> </a> 
                  )}
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
