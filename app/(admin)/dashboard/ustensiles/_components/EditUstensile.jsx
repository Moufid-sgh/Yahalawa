'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"

import { useFormStatus } from "react-dom"
import { editUstensile } from "@/app/actions/ustensile-action"
import { useState } from "react"


const EditUstensile = ({ el }) => {

    const { pending } = useFormStatus()

    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')

    const handleAction = async (formData) => {
        const result = await editUstensile(formData)

        if (result?.error) {
            setError(result.error)
        }
        else {
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className='border-2 rounded-md p-1.5 hover:border-blue duration-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="black" d="m14.06 9l.94.94L5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z" /></svg>
                </button>
            </DialogTrigger>

            <DialogContent className="flex flex-col items-center">
                <DialogHeader>
                    <DialogTitle className="text-xl">Editer ustensile</DialogTitle>
                </DialogHeader>

                <form action={handleAction} className="grid gap-4 py-4">
                    <input
                        type="text"
                        defaultValue={el.title}
                        placeholder="Nom de l'unité"
                        name="title"
                        className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 my-3 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                    />
                    <input type="hidden" name="id" value={el.id} />

                    <div className="flex flex-col items-center justify-center">
                        <DialogFooter>
                            <button className="green-btn text-sm" type="submit" disabled={pending} >
                                {pending
                                    ?
                                    <div className="flex items-center space-x-1">
                                        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="white"><path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" /><path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" /></g></svg>
                                        <span>Sauvgarder</span>
                                    </div>
                                    :
                                    'Sauvgarder'
                                }
                            </button>
                        </DialogFooter>
                        {error && <p className="text-sm text-red mt-2">{error}</p>}
                    </div>
                </form>
            </DialogContent>

        </Dialog>
    )
}

export default EditUstensile







