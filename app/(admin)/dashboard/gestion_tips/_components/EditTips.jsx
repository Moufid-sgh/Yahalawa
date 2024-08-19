'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"

import { useFormStatus } from "react-dom"
import { useState } from "react"
import dynamic from 'next/dynamic'
import { deleteCategorySelected, editTips } from "@/app/actions/tips-action"
const Select = dynamic(() => import("react-select"), { ssr: false })


const EditTips = ({ el, categoryList }) => {

    const { pending } = useFormStatus()

    //handle status
    const [status, setstatus] = useState(null)
    const handlestatus = (option) => {
        setstatus(option);
    };

    //handle type
    const [type, setType] = useState(null)
    const handleType = (option) => {
        setType(option);
    };

    //handle categorie    
    const [categorie, setCategorie] = useState([])
    const handleCategorie = (option) => {
        setCategorie(option);
    };

    const [open, setOpen] = useState(false)
    const [error, setError] = useState('')

    const handleAction = async (formData) => {
        const result = await editTips(formData)

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
                    <DialogTitle className="text-xl">Editer une astuce</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>


                <form action={handleAction} className="grid gap-4 p-4 overflow-y-auto h-[80vh]">
                    <input
                        type="text"
                        defaultValue={el.id_intern}
                        placeholder="IdI"
                        name="IdI"
                        className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 my-3 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                    />

                    <input
                        type="text"
                        defaultValue={el.title}
                        placeholder="Nom de l'unité"
                        name="title"
                        className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 my-3 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                    />

                    <textarea
                        rows="4"
                        className="p-2.5 h-32 w-72 md:w-96 resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        placeholder="Description"
                        name='description'
                        defaultValue={el.description}>
                    </textarea>


                    <Select
                        options={[
                            { value: 'publiée', label: 'publiée' },
                            { value: 'non publiée', label: 'non publiée' },
                            { value: 'brouillon', label: 'brouillon' }
                        ]}
                        onChange={handlestatus}
                        value={status}
                        defaultInputValue={el.status}
                        name="status"
                        placeholder={<div className="text-[#9CA3BC]">Statut</div>}
                        className="w-72 md:w-96 my-3"
                        classNamePrefix="my-react-select"
                        isClearable={true}
                        components={{
                            IndicatorSeparator: () => null
                        }}
                    />

                    <Select
                        options={[{ value: 'Free', label: 'Free' },
                        { value: 'T-Telecom', label: 'T-Telecom' }
                        ]}
                        onChange={handleType}
                        value={type}
                        defaultInputValue={el.is_paying}
                        name="type"
                        placeholder={<div className="text-[#9CA3BC]">Type</div>}
                        className="w-72 md:w-96"
                        classNamePrefix="my-react-select"
                        isClearable={true}
                        components={{
                            IndicatorSeparator: () => null
                        }}
                    />

                    <input
                        type="number"
                        defaultValue={el.likes}
                        placeholder="Likes"
                        name="likes"
                        className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 my-3 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                    />

                    <textarea
                        rows="4"
                        className="p-2.5 h-32 w-72 md:w-96 resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        placeholder="Note"
                        name='note'
                        defaultValue={el.note}>
                    </textarea>

                    <p className="font-semibold mt-4">Categories:</p>
                    <Select
                        options={categoryList.map((el, i) => ({
                            value: el.title,
                            label: el.title,
                            id: i
                        }))}
                        onChange={handleCategorie}
                        value={categorie}
                        name="category"
                        placeholder={<div className="text-[#9CA3BC]">nouvelle categorie</div>}
                        className="w-72 md:w-96 z-40"
                        classNamePrefix="my-react-select"
                        isClearable={true}
                        isMulti
                        components={{
                            IndicatorSeparator: () => null
                        }}
                    />

                    {/* categpry list************************/}
                    <div className="flex items-center flex-wrap">
                        {el.category.map((cat => {
                            return (
                                <div  key={cat.id} className="m-1.5 p-1 bg-gray flex items-center bg-gray rounded-md">
                                    <p>{cat.title}</p>
                                    <p onClick={()=>deleteCategorySelected(cat.id)} className='ml-2 cursor-pointer text-red hover:font-bold duration-300'>&#10005;</p>
                                </div>
                            )
                        }))}
                    </div>

            

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

export default EditTips







