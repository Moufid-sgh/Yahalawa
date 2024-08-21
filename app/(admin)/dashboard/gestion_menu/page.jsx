import prisma from "@/lib/db"
import Column from "./_components/Column"

const getEditableMenu = async () => {
  return await prisma.editableMenu.findMany({
    include: {
      subtitle: true
    }
  })
};



const GestionMenu = async () => {

  const editableMenu = await getEditableMenu();


  return (
    <main className='ml-12 mt-8'>

    <h1 className="text-2xl font-semibold tracking-wide mb-4">Gestion menu</h1>

      <div className="bg-white rounded-md flex items-start justify-between p-8">
          {
            Array.isArray(editableMenu) && editableMenu.map((el) => {
              return <Column key={el.id} menuList={el} />
            })
          }
      </div>

    </main>
  )
}

export default GestionMenu