import prisma from "@/lib/db"
import PaginationControls from "../../_components/PaginationControls"
import DeleteTag from "./DeleteTips"
import EditTag from "./EditTips"
import Image from "next/image"

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
          category: {
            contains: query,
            mode: 'insensitive',
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
  });


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
            <th className="px-4 py-2 text-left">Ajoutée le</th>
            <th className="px-4 py-2 text-left">MAJ</th>
            <th className="px-4 py-2 text-left">Note</th>
            <th className="px-4 py-2 text-left">IDI</th>
            <th className="px-4 py-2 text-left">Type</th>
            <th className="px-4 py-2 text-left">Status</th>
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
                      <Image src={el.img} alt="img" width='80' height='80' />
                      :
                      <span>&#10008;</span>
                    }
                </td>
                <td className="px-4 py-2 text-left">{el.title}</td>
                <td className="px-4 py-2 text-left">{el.category}</td>
                <td className="px-4 py-2 text-left">{el.author}</td>
                <td className="px-4 py-2 text-left">{formatDate(el.createdAt)}</td>
                <td className="px-4 py-2 text-left">{formatDate(el.updatedAt)}</td>
                <td className="px-4 py-2 text-left">{el.note}</td>
                <td className="px-4 py-2 text-left">{el.id_intern}</td>
                <td className="px-4 py-2 text-left">{el.is_paying}</td>
                <td className="px-4 py-2 text-left">{el.status}</td>
                <td className="px-4 py-2 w-40 flex items-center space-x-3">
                  <EditTag el={el} />
                  <DeleteTag el={el} />
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
