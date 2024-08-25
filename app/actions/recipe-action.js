'use server'

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { writeFile } from 'fs/promises'
import { join } from "path"
import ffmpeg from 'fluent-ffmpeg'
import { tipsData } from "../tables/tips"
import { create } from "domain"
import { steps } from "../tables/recipe_steps"


//add
export async function addRecipe(formData) {

    const IdI = formData.get('IdI')
    const title = formData.get('title')
    const description = formData.get('description')
    const type = formData.get('type')
    const status = formData.get('status')
    const difficulty = formData.get('difficulty')
    const category = formData.getAll('category')
    const nbr_serves = formData.get('nbr_serves')
    const preparation_time = formData.get('preparation_time')
    const cooking_time = formData.get('cooking_time')
    const cooking_temperature = formData.get('cooking_temperature')
    const note = formData.get('note')
    const likes = formData.get('likes')
    const video_link = formData.get('video_link')
    const seoTitle = formData.get('seoTitle')
    const seoDescription = formData.get('seoDescription')
    const hour = formData.get('hour')
    const date = formData.get('date')
    const img = formData.get('img')
    const video = formData.get('video')
    const ingredientList = JSON.parse(formData.getAll('ingredientList'))
    const lienRecetteList = JSON.parse(formData.getAll('lienRecetteList'))
    const instructionList = JSON.parse(formData.getAll('instructionList'))

    console.log(ingredientList)

    if (IdI === "" || title === "" || description === "" || type === "" || status === "" || category === "" || difficulty === "" || nbr_serves === "" || preparation_time === "" || cooking_time === "" || cooking_temperature === "") {
        return { error: "Veuillez remplir tous les champs requis." }
    }

    // if (!img.type.startsWith('image/')) {
    //     return { error: 'Veuillez télécharger un fichier image valide.' };
    //   }

    // if (!video.type.startsWith('video/')) {
    //     return { error: 'Veuillez télécharger un fichier vidéo valide.' };
    //   }

    //handle image
    const bytes = await img.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const name = `${Date.now()}-${img.name}`
    const path = join('tips_img', name)
    const fullPath = join('./public', path)


    //handle video
    const videobBytes = await video.arrayBuffer()
    const VideoBuffer = Buffer.from(videobBytes)
    const videoname = `${Date.now()}-${video.name}`;
    const videopath = join('tips_video', videoname);
    const videoFullPath = join('./public', videopath);


    try {
        if (img) {
            await writeFile(fullPath, buffer)
        }
        if (video) {
            await writeFile(videoFullPath, VideoBuffer)
        }

        //send data
        await prisma.recipes.create({
            data: {
                id: 1145,
                id_intern: IdI,
                title,
                description,
                is_paying: type,
                status,
                difficulty,
                note,
                likes: Number(likes),
                seoTitle,
                seoDescription,
                nbr_serves: Number(nbr_serves),
                preparation_time: Number(preparation_time),
                cooking_time: Number(cooking_time),
                cooking_temperature: Number(cooking_temperature),
                total_time: Number(preparation_time) + Number(cooking_time),
                author: "admin",
                video_link,
                rank: 2,
                scheduled_publish_date : "2022-02-02T13:51:00.000Z",
                category: {
                    create: category.map((el) => ({
                        title: el,
                    })),
                },
                ingredients: {
                    create: ingredientList.map((el) => ({
                        title : el.titre,
                        ingredient: el.name,
                        unite: el.unite,
                        qte_gramme: Number(el.quantite),
                    })),
                },
                steps: {
                    create: instructionList.map((el) => ({
                        title: el.titre,
                        description: el.instruction,
                        // step
                    }))
                },
                relatedRecipe: {
                    create: lienRecetteList.map((el) => ({
                        name: el.name ,
                        link: el.link
                    }))
                }
                // imgPath: `/${path}`?.replace(/\\/g, '/') 
                // videoPath: `/${path}`?.replace(/\\/g, '/')
            },
            include: {
                category: true,
                ingredients: true,
                steps: true,
                relatedRecipe: true
            }
        })

        revalidatePath('/dashboard/nouvelle_astuce')
        console.log('success')

    } catch (error) {
        console.log(error)
    }
}


//edit
export async function editRecipe(formData) {

    const IdI = formData.get('IdI')
    const title = formData.get('title')
    const description = formData.get('description')
    const type = formData.get('type')
    const status = formData.get('status')
    const category = formData.getAll('category')
    const note = formData.get('note')
    const likes = formData.get('likes')
    const id = Number(formData.get('id'))

    // if (title === "" || status === "") {
    //     return { error: "Veuillez remplir tous les champs requis." }
    // }

    try {
        await prisma.recipes.update({
            where: { id },
            data: {
                id_intern: IdI,
                title,
                description,
                is_paying: type,
                status,
                note,
                likes: Number(likes),
                category: {
                    create: category.map((el) => ({
                        title: el,
                    })),
                }
            },
            include: {
                category: true
            }
        })
        revalidatePath('/dashboard/gestion_tips')

    } catch (error) {
        console.log(error)
    }
}


//delete recipe
export async function deleteRecipe(id) {

    try {
        await prisma.recipes.delete({ where: { id } })
        revalidatePath('/dashboard/recettes')

    } catch (error) {
        console.log(error)
    }
};


//delete category recipe
// export async function deleteCategorySelected(id) {

//     try {
//         await prisma.categoryTipsSelected.delete({ where: { id } })
//         revalidatePath('/dashboard/gestion_tips')

//     } catch (error) {
//         console.log(error)
//     }
// }





