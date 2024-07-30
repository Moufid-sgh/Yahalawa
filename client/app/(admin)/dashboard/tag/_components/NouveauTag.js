'use client'

import { useRef } from "react"
import InputField from "../../_components/inputs/InputField"
import InputSelect from "../../_components/inputs/InputSelect"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"



const NouveauTag = ({status, setStatus, setTitre}) => {
  return (
    <Dialog>
    <DialogTrigger asChild>
        <button variant="outline" className="green-btn">&#10009; Ajouter un tag</button>
    </DialogTrigger>
    <DialogContent className="flex flex-col items-center">
        
        <DialogHeader>
            <DialogTitle className="text-xl">Nouveau tag</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col space-y-3 w-fit">

                <InputField type="text" setValue={setTitre}  placeholder="Nom du tag" />

                <InputSelect
                    value={status}
                    setValue={setStatus}
                    options={[ { value: 'Active', label: 'Active' },
                               { value: 'Inactive', label: 'Inactive' }
                            ]}
                    onChange={(status) => setStatus(status)}
                    placeholder="Type"
                />
            </form>

        <div className="flex justify-center mt-6">
        <DialogFooter>
            <button className="green-btn text-sm" type="submit">Sauvgarder</button>
        </DialogFooter>
        </div>

    </DialogContent>
</Dialog>
  )
}

export default NouveauTag







