'use server'


import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"


//add
export async function addIngredient(formData) {

    const title = formData.get('title')
    const type = formData.get('type')

    try {
        if (title !== '' && type != '') {
            await prisma.ingredients.create({
                data: { title, type }
            })
            revalidatePath('/dashboard/ingredients')
        }

    } catch (error) {
        console.log(error)
    }
}


//edit
export async function editIngredient(formData) {

    const title = formData.get('title')
    const type = formData.get('type')
    const id = Number(formData.get('id'))

    try {
        if (title !== '' && type != '') {
            await prisma.ingredients.update({
                where: { id },
                data: { title, type }
            })
            revalidatePath('/dashboard/ingredients')
        }

    } catch (error) {
        console.log(error)
    }
}


//delete
export async function deleteIngredient(id) {

    try {
        await prisma.ingredients.delete({ where: { id } })
        revalidatePath('/dashboard/ingredients')
  
      } catch (error) {
          console.log(error)
      }
}