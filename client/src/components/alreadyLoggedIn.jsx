import Nav from '../components/nav'
import Cookies from 'js-cookie';

export default function alreadyLoggedIn() {
    const handleLogout = () => {
        // Supprimer le cookie de l'utilisateur
        Cookies.remove('username');
        Cookies.remove('email')
        Cookies.remove('connect.sid')
      };

    return(
    <>  
        <Nav/>

        <div className="flex flex-col items-center justify-center pt-24">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Vous êtes déjà connectés !</h1>
            <p className='text-center'>Voici quelques raccourcis qui pourraient vous intéresser</p>

            <div className="flex gap-4 sm:gap-8 mt-6">
                <a
                    href="/"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Accueil
                </a>

                <a
                    href="/cave"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Votre cave
                </a>

                <a
                    href="/"
                    onClick={handleLogout}
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Déconnexion
                  </a>
            </div>
        </div>
    </>    
    )
}