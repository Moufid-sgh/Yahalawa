import prisma from "@/lib/db";
import FormData from "../_components/FormData"


const Updatetips = async ({params}) => {

  const tips = await prisma.tips.findUnique({
    where: { id: Number(params.id) },
    include: {category: true}
  });

  const categoryList = await prisma.categoryTips.findMany();


  return (
    <main className='ml-12 mt-8'>

      <h1 className="text-2xl font-semibold tracking-wide mb-4">Tips</h1>

      <FormData categoryList={categoryList} el={tips} />

    </main>
  )
}

export default Updatetips