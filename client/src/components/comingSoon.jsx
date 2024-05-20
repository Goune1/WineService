export default function comingSoon() {
    return (
        <div className="text-center mt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl ">Cette fonctionnalité arrive bientôt ⌛⌛</h1>
            <p className="text-xl sm:text-3xl mt-4 font-semibold">Découvrez plutôt : </p>
            <div className="flex gap-4 sm:gap-8 mt-6 items-center justify-center">
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
            </div>
        </div>
    )
}