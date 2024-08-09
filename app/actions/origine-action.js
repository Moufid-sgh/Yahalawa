'use server'

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { writeFile } from 'fs/promises'
import { join } from "path"

//add
export async function addOrigine(formData) {

    const title = formData.get('title')
    const img = formData.get('media')
    console.log(img)

    if(title === "" ||  typeof img.name === '') {
        return { error: "Veuillez remplir tous les champs requis." }
    }

    const bytes = await img.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const name = `${Date.now()}-${img.name}`
    const path = join('./public', 'flag', name)
    await writeFile(path, buffer)

    try {
            await prisma.origine.create({
                data: { title, img: path }
            })
            revalidatePath('/dashboard/origine')

    } catch (error) {
        console.log(error)
    }
};


//delete
export async function deleteOrigine(id) {

    try {
        await prisma.origine.delete({ where: { id } })
        revalidatePath('/dashboard/origine')
  
      } catch (error) {
          console.log(error)
      }
};