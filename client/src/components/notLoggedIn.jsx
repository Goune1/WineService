import { useNavigate } from 'react-router-dom';


export default function notLoggedIn() {
    return (
    <>
      <div className='flex flex-col items-center justify-center pt-24'> 
        <h1 className="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl">Vous devez être connecté pour accéder à votre cave</h1>
        <a
            href="/login"
            className="rounded-md bg-indigo-600 mt-12 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
         Se connecter
        </a>
      </div> 
    </>  
    )
}