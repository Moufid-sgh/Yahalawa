'use server'

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { writeFile } from 'fs/promises'
import { join } from "path"
import fs from "fs"

//add tips --------------------------------------------------------//
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
    const scheduledAt = formData.get('date')
    const img = formData.get('img')
    const video = formData.get('video')

    if(!IdI || !title || !description || !type || !status || category.length === 0) {
        return { error: "Veuillez remplir tous les champs requis." }
    }


    //handle image
    let image = null;
    const bytes = await img.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const name = `${Date.now()}-${img.name}`
    const path = join('tips_img', name)
    const fullPath = join('./public', path)
    await writeFile(fullPath, buffer)

    //handle video
    let vid = null;
    const videobBytes = await video.arrayBuffer()
    const VideoBuffer = Buffer.from(videobBytes)
    const videoname = `${Date.now()}-${video.name}`;
    const videopath = join('tips_video', videoname);
    const videoFullPath = join('./public', videopath);


    try {
        if (img.size !== 0) {
            await writeFile(fullPath, buffer)
            image = `/${path}`?.replace(/\\/g, '/') 
        }
        if (video.size !== 0) {
            await writeFile(videoFullPath, VideoBuffer)
            vid =`/${videopath}`?.replace(/\\/g, '/')
        }

        // send data
        await prisma.tips.create({
            data: { 
                id_intern: IdI, 
                title,
                slug : title.split(' ').join('-'), 
                author: 'admin',
                description,
                is_paying: type, 
                status,
                note, 
                likes: Number(likes),
                seoTitle,
                seoDescription,
                img: image,
                video_link: vid,
                category: {
                    create: category.map((el) => ({
                      title: el,
                    })),
                  },
            },
            include: {
                category: true
            }
        })

revalidatePath('/dashboard/nouvelle_astuce')

    } catch (error) {
    console.log(error)
}
};


//edit tips ----------------------------------------------------------//
export async function editTips(formData) {

    const IdI = formData.get('IdI')
    const title = formData.get('title')
    const description = formData.get('description')
    const type = formData.get('type')
    const status = formData.get('status')
    const category = JSON.parse(formData.get('category'));
    const note = formData.get('note')
    const likes = formData.get('likes')
    const seoTitle = formData.get('seoTitle')
    const seoDescription = formData.get('seoDescription')
    const img = formData.get('img')
    const video = formData.get('video')
    const id = Number(formData.get('id'))

    if(!IdI || !title || !description || !type || !status || category.length === 0) {
        return { error: "Veuillez remplir tous les champs requis." }
    }


        //handle image
        let image = null;
        const bytes = await img.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const name = `${Date.now()}-${img.name}`
        const path = join('tips_img', name)
        const fullPath = join('./public', path)
        await writeFile(fullPath, buffer)
    
        //handle video
        let vid = null;
        const videobBytes = await video.arrayBuffer()
        const VideoBuffer = Buffer.from(videobBytes)
        const videoname = `${Date.now()}-${video.name}`;
        const videopath = join('tips_video', videoname);
        const videoFullPath = join('./public', videopath);


    try {

        if (img.size !== 0) {
            await writeFile(fullPath, buffer)
            image = `/${path}`?.replace(/\\/g, '/') 
        }
        if (video.size !== 0) {
            await writeFile(videoFullPath, VideoBuffer)
            vid =`/${videopath}`?.replace(/\\/g, '/')
        }

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
                seoTitle,
                seoDescription,
                img: image,
                video_link: vid,
                category: {
                    deleteMany: {},
                    create: category.map((el) => ({
                        title: el.label
                      }))
              
                  }  
                },
                include: {
                    category: true
                }
        })
        revalidatePath('/dashboard/update_astuce')

    } catch (error) {
        console.log(error)
    }
};


//delete tips --------------------------------------------------------//
export async function deleteTips(id) {

    try {

        // delete img
        const tips = await prisma.tips.findUnique({where: { id }})
        let imgPath = tips.img
        let videoPath = tips.video_link

        if(imgPath)
            {fs.unlink(`public/${imgPath}`, (err) => {
            if (err) {
              console.error(`Error removing img: ${err}`);
              return;
            }
          
            console.log(`File ${imgPath} has been successfully removed.`);
          })};

          if(videoPath) {
            {fs.unlink(`public/${videoPath}`, (err) => {
                if (err) {
                  console.error(`Error removing img: ${err}`);
                  return;
                }
              
                console.log(`File ${videoPath} has been successfully removed.`);
              })};
          }

        //delete tips
        await prisma.tips.delete({ where: { id } })
        revalidatePath('/dashboard/gestion_tips')

    } catch (error) {
        console.log(error)
    }
}


//delete category tips --------------------------------------------------------------//
export async function deleteCategorySelected(id) {

    try {
        await prisma.categoryTipsSelected.delete({ where: { id } })
        revalidatePath('/dashboard/update_astuce')
  
      } catch (error) {
          console.log(error)
      }
}