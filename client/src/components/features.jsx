import { InboxIcon, TrashIcon, UsersIcon, HeartIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Un nombre illimité de bouteille',
    description:
      'Avec notre service vous pourrez facilement ajouter des centaines voir des milliers de vin différents, et les retrouver facilement grâce à la recherche intégrée.',
    icon: InboxIcon,
  },
  {
    name: 'Consulter les caves des autres',
    description:
      'Vous voulez savoir ce que votre ami possède dans sa cave ? Pas de soucis avec WineService retrouvez facilement la cave de vos amis.',
    icon: UsersIcon,
  },
  {
    name: 'Rappelez vous de vos vins préférés',
    description:
      'Une dégustation vous a particulièrement marqué ? Vous pourrez liker des bouteilles afin de les retrouver facilement.',
    icon: HeartIcon,
  },
]

export default function Example() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Un service <span className='text-indigo-600'>unique</span> en son genre
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Découvrez notre offre contenant des fonctionnalités uniques
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
