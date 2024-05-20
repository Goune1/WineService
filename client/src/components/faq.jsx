import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "Comment ajouter un vin à ma cave ?",
    answer:
      "Pour cela vous devez premièrement créer un compte en cliquant sur le bouton commencer en haut de la page, puis vous serez redirigé vers la page cave et vous aurez juste à cliquer sur Ajouter un vin",
  },
  {
    question: "Comment regarder ma consommation de vin ?",
    answer:
      "Vous avez simplement à cliquer sur l'onglet Consommation tout en haut de la page."
  },
  {
    question: "Comment regarder la cave de mon ami ?",
    answer: 
      "Cette fonctionnalité arrive bientôt."
  },
  {
    question: 'Si j\'ai bu une bouteille, puis-je modifier la quantité que j\'avais inscris sur le site ?',
    answer:
      'Bien sûr, pour cela vous avez besoin de cliquer sur les trois petits boutons au niveau de votre vin puis de cliquer sur modifier.'
  }
]

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Foire aux questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
