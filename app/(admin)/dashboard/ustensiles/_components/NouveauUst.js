'use client'

import InputField from "../../_components/inputs/InputField"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"



const NouveauUst = ({ setNewTitre }) => {
  return (
    <Dialog>
    <DialogTrigger asChild>
        <button variant="outline" className="green-btn">&#10009; Ajouter un ustensiles</button>
    </DialogTrigger>
    <DialogContent className="flex flex-col items-center">
        
        <DialogHeader>
            <DialogTitle className="text-xl">Nouveau ustensile</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
        <InputField  type="text" setValue={setNewTitre} placeholder="Nom de l'ustensile" />
        </div>

        <div className="flex justify-center mt-4">
        <DialogFooter>
            <button className="green-btn text-sm" type="submit">Sauvgarder</button>
        </DialogFooter>
        </div>

    </DialogContent>
</Dialog>
  )
}

export default NouveauUst







