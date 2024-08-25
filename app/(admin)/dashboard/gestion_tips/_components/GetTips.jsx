import prisma from "@/lib/db"
import PaginationControls from "../../_components/PaginationControls"
import Image from "next/image"
import DeleteTips from "./DeleteTips"
import EditTips from "./EditTips"

export const GetTips = async ({ query, page }) => {

  const pageSize = 20


  const whereTips = query
    ? {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          is_paying: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          status: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          category: {
            some: {
              title: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
        },
      ]
    }
    : {};


  const totalItems = await prisma.tips.count({
    where: whereTips,
  });

  const totalPages = Math.ceil(totalItems / pageSize);

  const tips = await prisma.tips.findMany({
    where: whereTips,
    skip: (page - 1) * pageSize,
    take: pageSize,
    include: {
      category: true,
    },
  });


  //get category for update
  const getCategory = async () => {
    return await prisma.categoryTips.findMany()
  }

  const categoryList = await getCategory()



  //Date format
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray bg-white">
        <thead className="text-sm lg:text-base">
          <tr>
            <th className="px-4 py-2 text-left">Id</th>
            <th className="px-3 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Titre</th>
            <th className="px-4 py-2 text-left">Catégorie</th>
            <th className="px-4 py-2 text-left">Auteur</th>
            <th className="px-4 py-2 text-left">Statut</th>
            <th className="px-4 py-2 text-left">Ajoutée le</th>
            <th className="px-4 py-2 text-left">MAJ</th>
            <th className="px-4 py-2 text-left">Note</th>
            <th className="px-4 py-2 text-left">IDI</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>

        {
          Array.isArray(tips) && tips.map((el) => {
            return (
              <tbody key={el.id} className="bg-white text-sm divide-y divide-gray text-darkgray">
                <tr>
                  <td className="px-4 py-2 text-left">{el.id}</td>
                  <td className="px-3 py-2 text-left">
                    {el.img
                      ?
                      <Image src={`${el.img}`} alt="img" width='80' height='80' />
                      :
                      <span>&#128683;</span>
                    }
                  </td>
                  <td className="px-4 py-2 text-left font-semibold">{el.title}</td>
                  <td className="px-4 py-2 text-left">
                    {el.category.map((el) => { return <p key={el.id}>{el.title}</p> })}
                  </td>
                  <td className="px-4 py-2 text-left">{el.author}</td>
                  <td className="px-4 py-2 text-left whitespace-nowrap">
                    {el.status === 'publiée' && <span className='border-2 border-green p-1 rounded-md'>{el.status}</span>}
                    {el.status === 'non publiée' && <span className='border-2 border-red p-1 rounded-md'>{el.status}</span>}
                    {el.status === 'brouillon' && <span className='border-2 border-gray p-1 rounded-md'>{el.status}</span>}
                  </td>
                  <td className="px-4 py-2 text-left">{formatDate(el.createdAt)}</td>
                  <td className="px-4 py-2 text-left">{el.updatedAt && formatDate(el.updatedAt)}</td>
                  <td className="px-4 py-2 text-left font-semibold">{el.note && el.note}</td>
                  <td className="px-4 py-2 text-left">{el.id_intern}</td>
                  <td className="px-2 py-2 text-left whitespace-nowrap">
                    {el.is_paying === 'Free' && <span className='green-badge'>{el.is_paying}</span>}
                    {el.is_paying === 'T-Telecom' && <span className='bleu-badge text-white'>{el.is_paying}</span>}
                  </td>
                  <td className="px-4 py-2 w-32 text-left space-x-3">
                    <EditTips el={el} categoryList={categoryList} />
                    <DeleteTips el={el} />
                  </td>
                </tr>
              </tbody>
            )
          })
        }

      </table>

      {
        (Array.isArray(tips) && tips.length === 0) && (
          <p className="bg-white text-sm italic p-4">Aucun résultat trouvé...</p>
        )
      }

      <PaginationControls currentPage={page} totalPages={totalPages} />
    </div >
  )
}
