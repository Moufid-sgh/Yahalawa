import FormData from "./_components/FormData"
import prisma from "@/lib/db"



const getOrigine = async () => {
    return await prisma.origine.findMany()
}

const getCategory = async () => {
    return await prisma.category.findMany()
}

const getUstensile = async () => {
    return await prisma.ustensiles.findMany()
}

const getUnit = async () => {
    return await prisma.unit.findMany()
}

const getIngredients = async () => {
    return await prisma.ingredients.findMany()
}

const getTags = async () => {
    return await prisma.tags.findMany()
}


const NewTips = async () => {

    const origine = await getOrigine()
    const category = await getCategory()
    const ustensile = await getUstensile()
    const unit = await getUnit()
    const ingredients = await getIngredients()
    const tags = await getTags()

    

    return (
        <main className='ml-12 mt-8'>

            <h1 className="text-2xl font-semibold tracking-wide mb-4">Ajouter une recette</h1>
            <FormData 
                origineList={origine} 
                categoryList={category} 
                ustensileList={ustensile}
                unitList={unit}
                ingredientsList={ingredients}
                tagsList={tags}
            />

        </main>
    )
}

export default NewTips







