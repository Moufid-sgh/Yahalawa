import prisma from "@/lib/db"
import Link from "next/link"
import PaginationControls from "../../_components/PaginationControls"
import Image from "next/image"
import DeleteRecipes from "./DeleteRecipes"


export const GetRecipes = async ({ query, page }) => {

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


    const totalItems = await prisma.recipes.count({
        where: whereTips,
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    const recipes = await prisma.recipes.findMany({
        where: whereTips,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
            category: true,
        },
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
                        <th className="px-4 py-2 text-left">Difficulté</th>
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
                    Array.isArray(recipes) && recipes.map((el) => {
                        return (
                            <tbody key={el.id} className="bg-white text-sm divide-y divide-gray text-darkgray">
                                <tr>
                                    <td className="px-4 py-2 text-left">{el.id}</td>
                                    <td className="px-3 py-2 text-left">
                                        {el.imgPath
                                            ?
                                            <Image src={`${el.imgPath}`} alt="img" width='70' height='70' />
                                            :
                                            <span>&#128683;</span>
                                        }
                                    </td>
                                    <td className="px-4 py-2 text-left font-semibold">{el.title}</td>
                                    <td className="px-4 py-2 text-left">
                                        {el.category && el.category.map((el) => { return <p key={el.id}>{el.title}</p> })}
                                    </td>
                                    <td className="px-4 py-2 text-left font-semibold">{el.difficulty}</td>
                                    <td className="px-4 py-2 text-left">Auteur</td>
                                    <td className="px-4 py-2 text-left">{formatDate(el.createdAt)}</td>
                                    <td className="px-4 py-2 text-left">{el.updatedAt && formatDate(el.updatedAt)}</td>
                                    <td className="px-4 py-2 text-left font-semibold">{el.note && el.note}</td>
                                    <td className="px-4 py-2 text-left">{el.id_intern}</td>
                                    <td className="px-2 py-2 text-left whitespace-nowrap">
                                        {el.is_paying === 'Free' && <span className='green-badge'>{el.is_paying}</span>}
                                        {el.is_paying === 'T-Telecom' && <span className='bleu-badge text-white'>{el.is_paying}</span>}
                                    </td>
                                    <td className="px-4 py-2 text-left">{el.status}</td>
                                    <td className="px-4 py-2 w-32 text-left space-x-3 flex">
                                        <Link href={`/dashboard/update_recette/${el.id}`} className='block w-[36px] border-2 rounded-md p-1.5 hover:border-blue duration-300'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="black" d="m14.06 9l.94.94L5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z" /></svg>
                                        </Link>
                                        <DeleteRecipes el={el} />
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                }

            </table>

            {
                (Array.isArray(recipes) && recipes.length === 0) && (
                    <p className="bg-white text-sm italic p-4">Aucun résultat trouvé...</p>
                )
            }

            <PaginationControls currentPage={page} totalPages={totalPages} />
        </div >
    )
}
