'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import dynamic from 'next/dynamic'
const Select = dynamic(() => import("react-select"), { ssr: false })
import { useState } from "react"
import { addTag } from "@/app/actions/tag-action"
import { addIngredient } from "@/app/actions/ingredient-action"




const NewIngredient = () => {


    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (option) => {
        setSelectedOption(option);
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <button variant="outline" className="green-btn">&#10010; Ajouter un ingredient</button>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center">

                <DialogHeader>
                    <DialogTitle className="text-xl">Nouveau ingredient</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                <form action={addIngredient} className="flex flex-col space-y-3 w-fit">
                    <input
                        placeholder="Nom du tag"
                        name="title"
                        className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 my-3 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                    />

                    <Select
                        options={[{ value: 'Unité', label: 'Unité' },
                            { value: 'Pièce', label: 'Pièce' }
                            ]}
                        onChange={handleChange}
                        value={selectedOption}
                        name="type"
                        placeholder={<div className="text-[#9CA3BC]">Type</div>}
                        className="w-72 md:w-96 my-3"
                        classNamePrefix="my-react-select"
                        isClearable={true}
                        components={{
                            IndicatorSeparator: () => null
                        }}
                    />


                    <div className="flex justify-center mt-6">
                        <DialogTrigger asChild>
                        <button className="green-btn text-sm" type="submit">Sauvgarder</button>
                        </DialogTrigger>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default NewIngredient







