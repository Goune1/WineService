import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'

const clients = [
  {
    id: 1,
    name: 'Chateau Margaux',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
    first: { quantity: '3', type : 'Rouge', year: "2009" },
    second: { quantity: '4', type: "Rouge", year: "2012" }
  },
  {
    id: 2,
    name: 'Chateau Seguin',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
    first: { quantity: '5', type: "Blanc", year: "2009" },
  },
  {
    id: 3,
    name: 'Chateau Rouillac',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
    first: { quantity: '4', type : 'Rouge', year: "2009"},

  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-3 xl:gap-x-8 pt-20 pl-24">
      {clients.map((client) => (
        <li key={client.id} className={classNames("overflow-hidden rounded-xl border border-gray-200 w-96", !client.second && "max-h-60")}>
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <div className="text-xl font-medium leading-6 text-gray-900">{client.name}</div>
            <Menu as="div" className="relative ml-auto">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open options</span>
                <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
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
                <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        View<span className="sr-only">, {client.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Edit<span className="sr-only">, {client.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <dl className={classNames("-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6", !client.second && "py-2")}>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Année</dt>
              <dd className="text-gray-700">
                <div className="font-medium text-gray-900">{client.first.year}</div>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3 pl-4">
              <dt className="text-gray-500">Quantité :</dt>
              <dd className="text-gray-700">
                <div className="font-medium text-gray-900">{client.first.quantity}</div>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3  pl-4">
              <dt className="text-gray-500">Type de vin :</dt>
              <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-900">{client.first.type}</div>
              </dd>
            </div>
          </dl>

          {client.second && (
            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6 pb-4">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Année</dt>
                <dd className="text-gray-700">
                  <div className="font-medium text-gray-900">{client.second.year}</div>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3 pl-4">
                <dt className="text-gray-500">Quantité :</dt>
                <dd className="text-gray-700">
                  <div className="font-medium text-gray-900">{client.second.quantity}</div>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3  pl-4">
                <dt className="text-gray-500">Type de vin :</dt>
                <dd className="flex items-start gap-x-2">
                  <div className="font-medium text-gray-900">{client.second.type}</div>
                </dd>
              </div>
            </dl>
          )}
        </li>
      ))}
    </ul>
  )
}
