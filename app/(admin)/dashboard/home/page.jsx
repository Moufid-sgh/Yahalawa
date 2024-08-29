import prisma from "@/lib/db"
import Image from "next/image"
import user from "@/public/dashboard/userBlack.svg"
import recette from "@/public/dashboard/knife-black.svg"
import paper from "@/public/dashboard/paper.svg"
import flag from '@/public/dashboard/flag-black.svg'
import ingredient from '@/public/dashboard/ingredient.svg'

const Page = async () => {


  const totalTips = await prisma.tips.count();
  const totalRecipes = await prisma.recipes.count();
  const totalIngredients = await prisma.ingredients.count();

  const cards = [
    {title: 'Recettes', number: totalRecipes, icon: recette},
    {title: 'Tips', number: totalTips, icon: flag},
    {title: 'Ingrédients', number: totalIngredients, icon: ingredient},
  ]

  return (
    <section className='flex items-center justify-center h-screen'>

      <div className="flex items-center space-x-8">
      {cards.map((el, i) => {
        return (
          <div key={i} className="flex flex-col justify-center space-y-3 bg-white rounded-lg shadow-md w-52 p-6">
            <div className="flex items-center space-x-2 text-xl">
              <Image src={el.icon} alt='icon'/>
              <p className=" font-semibold">{el.title}</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-blue text-xl font-bold">{el.number && el.number}</p>
              <p className="text-darkgray text-lg">{el.title}</p>
            </div>
          </div>
        )
       })}
      </div>


    </section>
  )
}

export default Page