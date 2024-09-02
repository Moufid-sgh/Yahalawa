import FormData from "./_components/FormData"
import prisma from "@/lib/db"





const NewTips = async () => {

    const categoryList = await prisma.categoryTips.findMany({ where: { status: 'Active'}})

    return (
        <main className='ml-12 mt-8'>

            <h1 className="text-2xl font-semibold tracking-wide mb-4">Ajouter une astuce</h1>
            <FormData categoryList={categoryList} />

        </main>
    )
}

export default NewTips







