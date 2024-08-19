import FormData from "./_components/FormData"
import prisma from "@/lib/db"



const getCategory = async () => {
    return await prisma.categoryTips.findMany()
}


const NewTips = async () => {

    const categoryList = await getCategory()

    return (
        <main className='ml-12 mt-8'>

            <h1 className="text-2xl font-semibold tracking-wide mb-4">Ajouter une recette</h1>
            <FormData categoryList={categoryList} />

        </main>
    )
}

export default NewTips







