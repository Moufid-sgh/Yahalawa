'use client'

import Image from "next/image"
import useStore from "@/app/store"
import user from "@/public/dashboard/userBlack.svg"
import recette from "@/public/dashboard/knife-black.svg"
import paper from "@/public/dashboard/paper.svg"

const page = () => {

  const navExpanded = useStore((state) => state.navExpanded)

  const cards = [
    {
      title: 'utilisateurs',
      icon: user
    },
    {
      title: 'recettes',
      icon: recette
    },
    {
      title: 'ingredients',
      icon: paper
    },
  ]

  return (
    <section className={`${navExpanded ? 'ml-56' : 'ml-16'} transition-all duration-500`}>

      <div className="flex items-center space-x-8">
      {cards.map((el, i) => {
        return (
          <div key={i} className="flex flex-col justify-center space-y-3 bg-white rounded-lg shadow-md w-fit p-6">
            <div className="flex items-center space-x-2 text-lg">
              <Image src={el.icon} alt='icon' className="text-balck" />
              <p>{el.title}</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-blue text-xl font-bold">4</p>
              <p className="text-darkgray">{el.title}</p>
            </div>
          </div>
        )
      })}
      </div>

    </section>
  )
}

export default page