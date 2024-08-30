'use server'

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { writeFile } from 'fs/promises'
import { join } from "path"
import ffmpeg from 'fluent-ffmpeg'
import { tipsData } from "../tables/tips"


//add
export async function addTips(formData) {

    const IdI = formData.get('IdI')
    const title = formData.get('title')
    const description = formData.get('description')
    const type = formData.get('type')
    const status = formData.get('status')
    const category = formData.getAll('category')
    const note = formData.get('note')
    const likes = formData.get('likes')
    const seoTitle = formData.get('seoTitle')
    const seoDescription = formData.get('seoDescription')
    const hour = formData.get('hour')
    const date = formData.get('date')
    const img = formData.get('img')
    const video = formData.get('video')

    if(!IdI || !title || !description || !type || !status || category.length === 0) {
        return { error: "Veuillez remplir tous les champs requis." }
    }


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

        // send data
        await prisma.tips.create({
            data: { 
                id_intern: IdI, 
                title, 
                description,
                is_paying: type, 
                status,
                note, 
                likes: Number(likes),
                seoTitle,
                seoDescription,
                category: {
                    create: category.map((el) => ({
                      title: el,
                    })),
                  },
                img: `/${path}`?.replace(/\\/g, '/') 
                // video_link: `/${path}`?.replace(/\\/g, '/')
            },
            include: {
                category: true
            }
        })



revalidatePath('/dashboard/nouvelle_astuce')
console.log('success')

    } catch (error) {
    console.log(error)
}
}


//edit
export async function editTips(formData) {

    const IdI = formData.get('IdI')
    const title = formData.get('title')
    const description = formData.get('description')
    const type = formData.get('type')
    const status = formData.get('status')
    const category = formData.getAll('category')
    const note = formData.get('note')
    const likes = formData.get('likes')
    const id = Number(formData.get('id'))

    if(!IdI || !title || !description || !type || !status || category.length === 0) {
        return { error: "Veuillez remplir tous les champs requis." }
    }

    try {
        await prisma.tips.update({
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


//delete tips
export async function deleteTips(id) {

    try {
        await prisma.tips.delete({ where: { id } })
        revalidatePath('/dashboard/gestion_tips')

    } catch (error) {
        console.log(error)
    }
}


//delete category tips
export async function deleteCategorySelected(id) {

    try {
        await prisma.categoryTipsSelected.delete({ where: { id } })
        revalidatePath('/dashboard/gestion_tips')
  
      } catch (error) {
          console.log(error)
      }
}