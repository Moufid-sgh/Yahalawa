'use server'


import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"


//add
export async function addTips(formData) {

    const title = formData.get('title')
    const status = formData.get('status')
    const description = formData.get('description')
    const seoTitle = formData.get('seoTitle')
    const seoDescription = formData.get('seoDescription')


    if(title === "" || status === "") {
        return { error: "Veuillez remplir tous les champs requis." }
    }

    try {
            await prisma.tips.create({
                data: { title, seoTitle, description, seoDescription, status }
            })
            revalidatePath('/dashboard/gestion_tips')

    } catch (error) {
        console.log(error)
    }
}


//edit
export async function editTips(formData) {

    const title = formData.get('title')
    const status = formData.get('status')
    const description = formData.get('description')
    const seoTitle = formData.get('seoTitle')
    const seoDescription = formData.get('seoDescription')
    const id = Number(formData.get('id'))

    if(title === "" || status === "") {
        return { error: "Veuillez remplir tous les champs requis." }
    }

    try {
            await prisma.tips.update({
                where: { id },
                data: { title, seoTitle, description, seoDescription, status }
            })
            revalidatePath('/dashboard/gestion_tips')

    } catch (error) {
        console.log(error)
    }
}


//delete
export async function deleteTips(id) {

    try {
        await prisma.tips.delete({ where: { id } })
        revalidatePath('/dashboard/gestion_tips')
  
      } catch (error) {
          console.log(error)
      }
}