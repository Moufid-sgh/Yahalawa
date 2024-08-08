'use server'


import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"


//add
export async function addTag(formData) {

    const title = formData.get('title')
    const status = formData.get('status')

    try {
        if (title !== '' && status != '') {
            await prisma.tags.create({
                data: { title, status }
            })
            revalidatePath('/dashboard/tag')
        }

    } catch (error) {
        console.log(error)
    }
}


//edit
export async function editTag(formData) {

    const title = formData.get('title')
    const status = formData.get('status')
    const id = Number(formData.get('id'))

    try {
        if (title !== '' && status != '') {
            await prisma.tags.update({
                where: { id },
                data: { title, status }
            })
            revalidatePath('/dashboard/tag')
        }

    } catch (error) {
        console.log(error)
    }
}


//delete
export async function deleteTag(id) {

    try {
        await prisma.tags.delete({ where: { id } })
        revalidatePath('/dashboard/tag')
  
      } catch (error) {
          console.log(error)
      }
}