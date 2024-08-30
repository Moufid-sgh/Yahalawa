'use server'

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { writeFile } from 'fs/promises'
import { join } from "path"
import ffmpeg from 'fluent-ffmpeg'
import { tipsData } from "../tables/tips"
import { steps } from "../tables/recipe_steps"


//add recipe
export async function addRecipe(formData) {
    const IdI = formData.get('IdI');
    const title = formData.get('title');
    const description = formData.get('description');
    const type = formData.get('type');
    const status = formData.get('status');
    const difficulty = formData.get('difficulty');
    const category = formData.getAll('category');
    const nbr_serves = formData.get('nbr_serves');
    const preparation_time = formData.get('preparation_time');
    const cooking_time = formData.get('cooking_time');
    const cooking_temperature = formData.get('cooking_temperature');
    const note = formData.get('note');
    const likes = formData.get('likes');
    const video_link = formData.get('video_link');
    const seoTitle = formData.get('seoTitle');
    const seoDescription = formData.get('seoDescription');
    const date = formData.get('date');
    const img = formData.get('img');
    const video = formData.get('video');
    const ingredientList = JSON.parse(formData.get('ingredientList'));
    const lienRecetteList = JSON.parse(formData.get('lienRecetteList'));
    const instructionList = JSON.parse(formData.get('instructionList'));
    const origineList = formData.getAll('origine');
    const tagsList = formData.getAll('tags');
    const ustensileList = formData.getAll('ustensiles');
    console.log(note)

    if(status === 'brouillon') {
        if (!IdI) {
            return { error: "Veuillez remplir IDI." };
        }
    }
    else {
        if (
            !IdI || !title || !description || !type || !status || tagsList.length === 0 ||
            !difficulty || !nbr_serves || !cooking_time || category.length === 0
        ) {
            return { error: "Veuillez remplir tous les champs requis." };
        }
    }


    //handle image
    const bytes = await img.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const name = `${Date.now()}-${img.name}`
    const path = join('recipe_img', name)
    const fullPath = join('./public', path)

    try {

        if (img) {
            await writeFile(fullPath, buffer)
        }

        // // Handle video
        // if (video) {
        //     const videoBytes = await video.arrayBuffer();
        //     const videoBuffer = Buffer.from(videoBytes);
        //     const videoName = `${Date.now()}-${video.name}`;
        //     const videoPath = join('recipe_video', videoName);
        //     const videoFullPath = join('./public', videoPath);

        //     await writeFile(videoFullPath, videoBuffer);
        // }

        // Send data to database
        await prisma.recipes.create({
            data: {
                id_intern: IdI,
                title,
                slug: title.split(' ').join('-'),
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
                scheduled_publish_date: "2022-02-02T13:51:00.000Z",
                category: {
                    create: category.map((el) => ({
                        title: el,
                    })),
                },
                origine: {
                    create: origineList.map((el) => ({
                        title: el,
                        img: "46879"
                    })),
                },
                tags: {
                    create: tagsList.map((el) => ({
                        title: el,
                    })),
                },
                ustensiles: {
                    create: ustensileList.map((el) => ({
                        title: el,
                    })),
                },
                ingredients: {
                    create: ingredientList.map((el) => ({
                        title: el.titre,
                        qte_gramme: Number(el.quantite),
                        unite: el.unite,
                        ingredient: el.name,
                    })),
                },
                steps: {
                    create: instructionList.map((el, index) => ({
                        title: el.title,
                        description: el.description,
                        step: index + 1,
                    })),
                },
                relatedRecipe: {
                    create: lienRecetteList.map((el) => ({
                        name: el.name,
                        link: el.link,
                    })),
                },
                imgPath: `/${path}`?.replace(/\\/g, '/'),
                // videoPath: video ? `/${videoPath}`.replace(/\\/g, '/') : null,
            },
            include: {
                category: true,
                ingredients: true,
                steps: true,
                relatedRecipe: true,
                origine: true,
                tags: true,
                ustensiles: true,
            },
        });

        revalidatePath('/dashboard/nouvelle_astuce');
        console.log('success');
    } catch (error) {
        console.error(error);
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
export async function deleteCategorySelected(id) {

    try {
        await prisma.categoryRecipesSelected.delete({ where: { id } })
        revalidatePath('/dashboard/update_recette')

    } catch (error) {
        console.log(error)
    }
}

//delete origine recipe
export async function deleteOrigineSelected(id) {

    try {
        await prisma.origineRecipe.delete({ where: { id } })
        revalidatePath('/dashboard/update_recette')

    } catch (error) {
        console.log(error)
    }
}






