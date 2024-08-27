import prisma from "@/lib/db"
import EditRecipe from "../_components/EditRecipe";


const UpdateRecette = async ({ params }) => {

  const recette = await prisma.recipes.findUnique({
    where: { id: Number(params.id) },
    include: {
      category: true,
      ingredients: true,
      relatedRecipe: true,
      steps: true,
      origine: true,
      tags: true,
    }
  });


  const getOrigine = await prisma.origine.findMany()

  const getCategory = await prisma.category.findMany()

  const getUstensile = await prisma.ustensiles.findMany()

  const getUnit = await prisma.unit.findMany()

  const getIngredients = await prisma.ingredients.findMany()

  const getTags = await prisma.tags.findMany()


console.log(recette)

  return (
    <main className='ml-12 mt-8'>

      <h1 className="text-2xl font-semibold tracking-wide mb-4">Update recette</h1>

      <EditRecipe
        recette={recette}
        origineList={getOrigine}
        categoryList={getCategory}
        ustensileList={getUstensile}
        unitList={getUnit}
        allIngredients={getIngredients}
        tagsList={getTags}
      />

    </main>
  )
}

export default UpdateRecette